import axios from "axios";
import { ApiResponse, Memo, Todo } from "../types";

export const getGptTodoResponse = async (prompt: string) => {
  try {
    const response = await axios.post<ApiResponse<Todo>>("/api/gpt/chat-todo", {
      prompt,
    });

    if (!response.data.ok) {
      throw new Error(response.data.message || "GPT 요청 실패");
    }

    return response.data.data;
  } catch (error) {
    console.error("GPT 요청 중 에러:", error);
    throw error;
  }
};

export const getGptMemoResponse = async (prompt: string) => {
  try {
    const response = await axios.post("/api/gpt/chat-memo", { prompt });

    if (!response.data.ok) {
      throw new Error(response.data.message || "GPT 요청 실패");
    }

    return response.data.data;
  } catch (error) {
    console.error("GPT 요청 중 에러:", error);
    throw error;
  }
};

export const createMemo = async (memo: Memo) => {
  try {
    const response = await axios.post<ApiResponse<Memo>>("/api/notion/create-memo", memo);

    if (!response.data.ok) {
      throw new Error(response.data.message || "할 일 생성 실패");
    }

    return response.data.data;
  } catch (error) {
    console.error("Notion 등록 중 에러:", error);
    throw error;
  }
};

export const createTodo = async (todo: Todo) => {
  try {
    const response = await axios.post("/api/notion/create-todo", todo);

    if (!response.data.ok) {
      throw new Error(response.data.message || "할 일 생성 실패");
    }

    return response.data.data;
  } catch (error) {
    console.error("Notion 등록 중 에러:", error);
    throw error;
  }
};
