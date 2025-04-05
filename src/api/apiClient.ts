import axios from "axios";
import { Todo } from "../types";

export const getChatGptResponse = async (prompt: string) => {
  try {
    const response = await axios.post("/api/gpt/chat", { prompt });

    if (!response.data.ok) {
      throw new Error(response.data.message || "GPT 요청 실패");
    }

    return response.data.data;
  } catch (error) {
    console.error("GPT 요청 중 에러:", error);
    throw error;
  }
};

export const createTodo = async (todo: Todo) => {
  try {
    const response = await axios.post("/api/notion/createTodo", todo);

    if (!response.data.ok) {
      throw new Error(response.data.message || "할 일 생성 실패");
    }

    return response.data.data;
  } catch (error) {
    console.error("Notion 등록 중 에러:", error);
    throw error;
  }
};
