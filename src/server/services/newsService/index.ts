import { CreatePageResponse } from "@notionhq/client/build/src/api-endpoints";
import { ProcessedNewsItem, RawNewsItem } from "../../../types";
import { crawlLogDB, newsDB } from "../../db";
import { getGptNewsResponse } from "../gptService";
import { createNewsInNotion } from "../notionService";
import { fetchAllFeeds } from "./crawler";
import { saveDB } from "./saveDB";
import { updateDB } from "./updateDB";
import dayjs from "dayjs";

interface ProcessNewsResponse {
  success: boolean;
  feeds?: RawNewsItem[];
  processed?: ProcessedNewsItem[];
  error?: string;
  notionResults?: {
    successful: number;
    failed: number;
    errors: unknown[]; // 또는 더 구체적인 타입으로 지정 가능
  };
}

const BATCH_SIZE = 2;

export const processNews = async (): Promise<ProcessNewsResponse> => {
  try {
    const feeds = await fetchAllFeeds();
    const dbResults = await saveDB(feeds);

    if (!dbResults.success) {
      throw new Error(dbResults.error);
    }

    const newFeeds = await new Promise<RawNewsItem[]>((resolve, reject) => {
      newsDB.find(
        { isCompleted: false },
        (error: Error | null, docs: RawNewsItem[]) => {
          if (error) {
            reject(error);
          } else {
            resolve(docs);
          }
        }
      );
    });

    if (newFeeds.length > 0) {
      const processInBatches = async (feeds: RawNewsItem[]) => {
        const results: ProcessedNewsItem[] = [];

        for (let i = 0; i < feeds.length; i += BATCH_SIZE) {
          const batch = feeds.slice(i, i + BATCH_SIZE);
          const batchResults = await getGptNewsResponse(batch);
          results.push(...batchResults);
        }

        return results;
      };

      const gptResults = await processInBatches(newFeeds);
      await updateDB(gptResults);

      // Save to Notion
      const notionResults = [];
      for (const news of gptResults) {
        try {
          const result = await createNewsInNotion(news);
          notionResults.push({ status: "fulfilled", value: result });
        } catch (error) {
          notionResults.push({ status: "rejected", reason: error });
        }
      }

      const notionErrors = notionResults
        .filter(
          (result): result is PromiseRejectedResult =>
            result.status === "rejected"
        )
        .map((result) => result.reason);

      const successfulNotionResults = notionResults
        .filter(
          (result): result is PromiseFulfilledResult<CreatePageResponse> =>
            result.status === "fulfilled"
        )
        .map((result) => result.value);

      await new Promise<void>((resolve) => {
        crawlLogDB.update(
          {
            status: "pending",
            executedAt: dayjs().toISOString,
          },
          {
            $set: { status: "success" },
          },
          { multi: false },
          (err) => {
            if (err)
              throw new Error(
                `Failed to update crawl log status: ${err.message}`
              );
            resolve();
          }
        );
      });

      return {
        success: true,
        feeds: dbResults.savedFeeds,
        processed: gptResults,
        notionResults: {
          successful: successfulNotionResults.length,
          failed: notionErrors.length,
          errors: notionErrors,
        },
      };
    } else {
      return { success: true, feeds: [] };
    }
  } catch (error: unknown) {
    console.error("Error processing news:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
