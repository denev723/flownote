import axios, { AxiosError } from "axios";

const ERROR_MESSAGES = {
  // API 통신 관련
  network: "네트워크 연결에 문제가 있습니다. 인터넷 연결을 확인해주세요.",
  timeout: "요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.",
  server: "서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",

  // 기능별 메시지
  gpt: "AI 처리 중 문제가 발생했습니다.",
  notion: "Notion 연동 중 문제가 발생했습니다.",
  news: "뉴스 수집 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",

  // 기본 메시지
  default: "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

export const handleApiError = (
  error: unknown,
  type: "gpt" | "notion" | "news" | "default" = "default"
) => {
  console.error(`API Error (${type})`, error);

  let userMessage = ERROR_MESSAGES[type] || ERROR_MESSAGES.default;

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    if (!axiosError.response) {
      userMessage = ERROR_MESSAGES.network;
    } else if (axiosError.code === "ECONNABORTED") {
      userMessage = ERROR_MESSAGES.timeout;
    } else if (axiosError.response.status >= 500) {
      userMessage = ERROR_MESSAGES.server;
    }
  }

  alert(userMessage);

  return { message: userMessage, originalError: error };
};
