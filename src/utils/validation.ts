import { Todo } from "../types";

export function isValidTodo(obj: unknown): obj is Todo {
  if (typeof obj !== "object" || obj === null) return false;

  const o = obj as Partial<Todo>;

  if (!("title" in o) || typeof o.title !== "string") return false;

  if ("dueDate" in o && typeof o.dueDate !== "string") return false;

  if ("status" in o && typeof o.status !== "string") return false;

  return true;
}
