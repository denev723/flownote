import { GPTTodo } from "../types";

export function isValidTodo(obj: unknown): obj is GPTTodo {
  if (typeof obj === "object" && obj !== null && "title" in obj && "startDate" in obj && "endDate" in obj && "group" in obj) {
    const o = obj as GPTTodo;
    return typeof o.title === "string" && typeof o.startDate === "string" && typeof o.endDate === "string" && typeof o.group === "string";
  }
  return false;
}
