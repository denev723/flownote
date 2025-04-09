import { ProcessedNewsItem, RawNewsItem } from "../../../types";
import { newsDB } from "../../db";
import { getGptNewsResponse } from "../gptService";
import { fetchAllFeeds } from "./crawler";
import { saveDB } from "./saveDB";
import { updateDB } from "./updateDB";

interface ProcessNewsResponse {
  success: boolean;
  feeds?: RawNewsItem[];
  processed?: ProcessedNewsItem[];
  error?: string;
}

export const processNews = async (): Promise<ProcessNewsResponse> => {
  try {
    const feeds = await fetchAllFeeds();
    const dbResults = await saveDB(feeds);

    if (!dbResults.success) {
      throw new Error(dbResults.error);
    }

    const newFeeds = await new Promise<RawNewsItem[]>((resolve, reject) => {
      newsDB.find({ isCompleted: false }, (error: Error | null, docs: RawNewsItem[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(docs);
        }
      });
    });

    if (newFeeds.length > 0) {
      const gptResults = await getGptNewsResponse(newFeeds);
      await updateDB(gptResults);

      return { success: true, feeds: dbResults.savedFeeds, processed: gptResults };
    } else {
      return { success: true, feeds: [] };
    }
  } catch (error: unknown) {
    console.error("Error processing news:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};
