import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GPTTodo {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  group: "개인" | "회사" | "프로젝트" | "기타";
}

interface TodoStore {
  todo: GPTTodo | null;
  setGptResult: (todo: GPTTodo) => void;
  resetGptResult: () => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todo: null,
      setGptResult: (todo) => set({ todo }),
      resetGptResult: () => set({ todo: null }),
    }),
    {
      name: "flownote-todo", // localStorage key
    }
  )
);
