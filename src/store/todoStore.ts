import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TodoStore } from "../types";

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todo: null,
      isComplete: false,
      setGptResult: (todo) => set({ todo }),
      resetGptResult: () => set({ todo: null }),
      toggleComplete: (status) => set({ isComplete: status }),
      resetComplete: () => set({ isComplete: false }),
    }),
    {
      name: "flownote-todo", // localStorage key
    }
  )
);
