import dayjs from "dayjs";
import { CrawlLog, RawNewsItem } from "../../../types";
import { crawlLogDB, newsDB } from "../../db";

interface SaveDBResponse {
  success: boolean;
  savedFeeds: RawNewsItem[];
  error?: string;
}

export const saveDB = async (feeds: RawNewsItem[]): Promise<SaveDBResponse> => {
  try {
    const calTwoWeeks = dayjs().subtract(2, "week").toISOString();
    const deletedFeedCount = await new Promise<number>((resolve) => {
      newsDB.remove(
        { createdAt: { $lt: calTwoWeeks } },
        { multi: true },
        (err, numRemoved) => {
          if (err)
            throw new Error(`Failed to remove old feeds: ${err.message}`);
          resolve(numRemoved);
        }
      );
    });
    const getTotalFeeds = await new Promise<number>((resolve) => {
      newsDB.count({}, (err, count) => {
        if (err) throw new Error(`Failed to count feeds: ${err.message}`);
        resolve(count);
      });
    });
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
        const savedFeed = await new Promise<RawNewsItem>((resolve) => {
          newsDB.insert({ ...feed, isCompleted: false }, (err, result) => {
            if (err) throw new Error(`Failed to save feed: ${err.message}`);
            resolve(result);
          });
        });

        await new Promise<CrawlLog>((resolve, reject) => {
          crawlLogDB.insert<CrawlLog>(
            {
              executedAt: dayjs().toISOString(),
              totalFeeds: getTotalFeeds,
              newFeeds: results.length,
              deletedFeeds: deletedFeedCount,
              status: "pending",
            },
            (err, doc) => {
              if (err) reject(err);
              else resolve(doc);
            }
          );
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
