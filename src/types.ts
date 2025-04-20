// API 관련 타입
export type ApiResponse<T> = {
  ok: boolean;
  message?: string;
  data?: T;
};

// 할 일 관련 타입
export interface Todo {
  title: string;
  status: "할 일" | "진행 중" | "완료 🙌";
  dueDate: string;
}

// 메모 관련 타입
export type MemoCategory =
  | "회의"
  | "아이디어"
  | "자기계발"
  | "쇼핑"
  | "집"
  | "메모";

export type MemoListType = "list" | "checkbox" | "none";
export interface Memo {
  title: string;
  category?: MemoCategory;
  link?: string;
  summary: string;
  bullets?: string[];
  listType: MemoListType;
}

// 뉴스 관련 타입

export interface RawNewsItem {
  title: string;
  link: string;
  description: string;
  publishDate: string;
  source: string;
  isCompleted: boolean;
  createdAt: string;
  _id?: string;
}

export interface ProcessedNewsItem {
  id: string;
  source: string;
  publishedDate: string;
  processedDate: string;

  originalTitle: string;

  title: string;
  summary: string;
  link: string;

  tags: string[];
  type: "article" | "release" | "tutorial" | "tool" | "news";

  status: "new" | "processed" | "error";
}

export interface CrawlLog {
  executedAt: string;
  totalFeeds: number;
  newFeeds: number;
  deletedFeeds: number;

  status: "pending" | "success" | "error";
  error?: string;
}
