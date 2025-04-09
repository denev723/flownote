import axios from "axios";
import { ApiResponse, Memo, RawNewsItem, Todo } from "../types";
import { handleApiError } from "../utils/errorHandler";

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
    handleApiError(error, "gpt");
    return null;
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
    handleApiError(error, "gpt");
    return null;
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
    handleApiError(error, "notion");
    return null;
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
    handleApiError(error, "notion");
    return null;
  }
};

export const processNews = async () => {
  try {
    const response = await axios.post<{ success: boolean; feeds?: RawNewsItem[]; error?: string }>(
      "/api/news/process"
    );

    if (!response.data || !response.data.success) {
      throw new Error(response.data?.error || "뉴스 처리 실패");
    }
    return response.data;
  } catch (error) {
    handleApiError(error, "news");
    return null;
  }
};
