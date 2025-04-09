import { ProcessedNewsItem } from "../../../types";
import { newsDB } from "../../db";

export const updateDB = async (gptResults: ProcessedNewsItem[]) => {
  const updatePromises = gptResults.map(async (gptResult) => {
    return new Promise<void>((resolve, reject) => {
      newsDB.update(
        { link: gptResult.link },
        {
          $set: {
            isCompleted: true,
          },
        },
        {},
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });
  });

  try {
    await Promise.all(updatePromises);
  } catch (error) {
    console.error(error);
  }
};
