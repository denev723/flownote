import DataStore from "nedb";

export const newsDB = new DataStore({
  filename: "./data/news.db",
  autoload: true,
});
