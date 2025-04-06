export interface Todo {
  title: string;
  status: "할 일" | "진행 중" | "완료 🙌";
  dueDate: string;
}

export interface TodoStore {
  todo: Todo | null;
  setGptResult: (todo: Todo) => void;
  resetGptResult: () => void;
}
