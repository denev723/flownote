import { RawNewsItem } from "../../../types";
import { newsDB } from "../../db";

interface SaveDBResponse {
  success: boolean;
  savedFeeds: RawNewsItem[];
  error?: string;
}

export const saveDB = async (feeds: RawNewsItem[]): Promise<SaveDBResponse> => {
  try {
    const results: RawNewsItem[] = [];
    for (const feed of feeds) {
      const existingFeed = await new Promise((resolve, reject) => {
        newsDB.findOne({ link: feed.link }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(!!result);
          }
        });
      });

      if (!existingFeed) {
        const savedFeed = await new Promise<RawNewsItem>((resolve, reject) => {
          newsDB.insert({ ...feed, isCompleted: false }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          });
        });
        results.push(savedFeed);
      }
    }
    return { success: true, savedFeeds: results };
  } catch (error: unknown) {
    console.error("Error saving news to DB:", error);
    return {
      success: false,
      savedFeeds: [],
      error: error instanceof Error ? error.message : "Unknown database error",
    };
  }
};
