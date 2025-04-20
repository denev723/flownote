import DataStore from "nedb";

export const newsDB = new DataStore({
  filename: "./data/news.db",
  autoload: true,
});

export const crawlLogDB = new DataStore({
  filename: "./data/crawlLog.db",
  autoload: true,
});
