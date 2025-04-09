import Parser from "rss-parser";
import { RawNewsItem, NewsSource } from "../../../types";
import { cleanContent } from "../../../utils/cleanContent";

const RSS_FEEDS = {
  "Javascript Weekly": "https://javascriptweekly.com/rss/all",
  "CSS Weekly": "https://css-weekly.com/rss",
  "Frontend Focus": "https://frontendfoc.us/rss",
};

type CustomFeed = {
  title: string;
  link: string;
  description: string;
};

type CustomItem = {
  title: string;
  link: string;
  content: string;
  contentSnippet?: string;
  isoDate?: string;
  pubDate?: string;
};

const parser: Parser<CustomFeed, CustomItem> = new Parser({
  headers: {
    "User-Agent": "Mozilla/5.0 (compatible; NewsBot/1.0)",
  },
  timeout: 5000,
  maxRedirects: 3,
  customFields: {
    item: ["content", "contentSnippet", "isoDate"],
  },
});

export const fetchSingleFeed = async (source: NewsSource, url: string): Promise<RawNewsItem[]> => {
  try {
    const feed = await parser.parseURL(url);

    return feed.items.map((item) => ({
      title: item.title || "",
      link: item.link || "",
      description: cleanContent(item.content || item.contentSnippet || ""),
      publishDate: item.isoDate || item.pubDate || new Date().toISOString(),
      source: source,
      isCompleted: false,
    }));
  } catch (error) {
    console.error(`Error fetching ${source}:`, error);
    return [];
  }
};

export const fetchAllFeeds = async (): Promise<RawNewsItem[]> => {
  const allItems: RawNewsItem[] = [];

  for (const [source, url] of Object.entries(RSS_FEEDS)) {
    const items = await fetchSingleFeed(source as NewsSource, url);
    allItems.push(...items);
  }

  return allItems;
};
