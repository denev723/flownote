export type ApiResponse<T> = {
  ok: boolean;
  message?: string;
  data?: T;
};

export interface Todo {
  title: string;
  status: "할 일" | "진행 중" | "완료 🙌";
  dueDate: string;
}

export type MemoCategory = "회의" | "아이디어" | "자기계발" | "쇼핑" | "집" | "메모";

export type MemoListType = "list" | "checkbox" | "none";
export interface Memo {
  title: string;
  category?: MemoCategory;
  link?: string;
  summary: string;
  bullets?: string[];
  listType: MemoListType;
}
