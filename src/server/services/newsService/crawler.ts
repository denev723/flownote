import Parser from "rss-parser";
import { RawNewsItem } from "../../../types";
import { cleanContent } from "../../../utils/cleanContent";
import dayjs from "dayjs";

const RSS_FEEDS = {
  "React Status": "https://react.statuscode.com/rss",
  "JavaScript Weekly": "https://javascriptweekly.com/rss",
  "Josh W Comeau": "https://www.joshwcomeau.com/rss.xml",
  "Kent C. Dodds": "https://kentcdodds.com/blog/rss.xml",
  "Vercel Blog": "https://vercel.com/atom",
} as const;

const NEWSLETTER_SOURCES = ["React Status", "JavaScript Weekly"];
const MAX_ITEMS_PER_NEWSLETTER = 3;

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
  categories?: string[];
};

const parser: Parser<CustomFeed, CustomItem> = new Parser({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept:
      "application/rss+xml, application/xml, application/atom+xml, text/xml, */*",
  },
  timeout: 15000,
  maxRedirects: 5,
  customFields: {
    item: ["content", "contentSnippet", "isoDate", "categories"],
  },
});

const processNewsletterContent = (content: string): string => {
  const sections = content.split(
    /(?:IN BRIEF:|RELEASES:|Articles & Tutorials|🛠 Code & Tools)/
  );

  if (sections.length > 1) {
    return sections.slice(0, 2).join("\n\n").trim();
  }

  return content;
};

export const fetchSingleFeed = async (
  source: string,
  url: string
): Promise<RawNewsItem[]> => {
  try {
    const feed = await parser.parseURL(url);

    const today = dayjs();
    const lastMonday = today.subtract(1, "week").startOf("week").add(1, "day");
    const lastSunday = lastMonday.add(6, "day");

    let items = feed.items
      .map((item) => {
        let description = item.content || item.contentSnippet || "";

        if (NEWSLETTER_SOURCES.includes(source)) {
          description = processNewsletterContent(description);
        }

        description = cleanContent(description);

        return {
          title: item.title || "",
          link: item.link || "",
          description,
          publishDate: item.isoDate || item.pubDate || new Date().toISOString(),
          source: source,
          isCompleted: false,
          createdAt: new Date().toISOString(),
        };
      })
      .filter((item) => {
        const pubDay = dayjs(item.publishDate);
        return (
          pubDay.isAfter(lastMonday) && pubDay.isBefore(lastSunday.endOf("day"))
        );
      });

    if (NEWSLETTER_SOURCES.includes(source)) {
      items = items.slice(0, MAX_ITEMS_PER_NEWSLETTER);
    }

    return items;
  } catch (error) {
    console.error(`Error fetching ${source}:`, error);
    return [];
  }
};

export const fetchAllFeeds = async (): Promise<RawNewsItem[]> => {
  const allItems: RawNewsItem[] = [];

  for (const [source, url] of Object.entries(RSS_FEEDS)) {
    const items = await fetchSingleFeed(source, url);
    allItems.push(...items);
  }

  return allItems.sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
};
