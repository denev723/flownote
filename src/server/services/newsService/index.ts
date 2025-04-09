import { ProcessedNewsItem, RawNewsItem } from "../../../types";
import { getGptNewsResponse } from "../gptService";
import { fetchAllFeeds } from "./crawler";
import { saveDB } from "./saveDB";

interface ProcessNewsResponse {
  success: boolean;
  feeds?: RawNewsItem[];
  processed?: ProcessedNewsItem[];
  error?: string;
}

export const processNews = async (): Promise<ProcessNewsResponse> => {
  try {
    const feeds = await fetchAllFeeds();
    const dbResult = await saveDB(feeds);

    if (!dbResult.success) {
      throw new Error(dbResult.error);
    }

    if (dbResult.savedFeeds && dbResult.savedFeeds.length > 0) {
      const gptResult = await getGptNewsResponse((dbResult.savedFeeds as RawNewsItem[]) || []);
      console.log(gptResult);

      return { success: true, feeds: dbResult.savedFeeds, processed: gptResult };
    } else {
      return { success: true, feeds: [] };
    }
  } catch (error: unknown) {
    console.error("Error processing news:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};
