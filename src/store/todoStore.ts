import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TodoStore } from "../types";

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
