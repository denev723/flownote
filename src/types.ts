export type GroupType = "개인" | "회사" | "프로젝트" | "기타";

export interface GPTTodo {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  group: GroupType;
}

export interface TodoStore {
  todo: GPTTodo | null;
  setGptResult: (todo: GPTTodo) => void;
  resetGptResult: () => void;
}
