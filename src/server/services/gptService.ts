import OpenAI from "openai";
import dayjs from "dayjs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const today = dayjs().format("YYYY-MM-DD");

export const getChatGptResponse = async (prompt: string) => {
  const chatCompletion = await client.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      {
        role: "system",
        content: `
          너는 사용자의 자연어를 분석해서 할 일을 추출해주는 AI 비서야.
          응답은 반드시 JSON 형식으로 반환해야 해.

          다음과 같은 구조로 만들어줘:

          {
            "title": "기획안 작성",
            "status": "할 일",
            "dueDate": "YYYY-MM-DD"
          }

          주의사항:
          - 반드시 JSON만 응답해. 설명 문장 금지!
          - "오늘"은 반드시 "한국 시간(KST, UTC+9)" 기준으로 해석해야 해.
          - 오늘 날짜는 "${today}"야.
          - 사용자가 "오늘"이라고 말한 경우에만 dueDate를 "${today}"로 설정해.
          - 사용자가 특정 날짜를 말한 경우, 그 날짜를 그대로 dueDate로 설정해.
          - 날짜는 한국 기준으로 해석해.
          - 시간대가 없으면 하루 종일 일정으로 처리해.
          - 그룹은 없으면 '기타'로 설정해.
          - status는 '할 일', '진행 중', '완료 🙌' 중 하나로 설정해.
          - dueDate는 YYYY-MM-DD 형식으로 설정해.
        `,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.4,
    max_tokens: 400,
  });

  const getResponse = chatCompletion.choices[0].message.content;
  try {
    const parsedResponse = JSON.parse(getResponse || "{}");
    return parsedResponse;
  } catch (error) {
    console.error("GPT 응답 파싱 오류:", error);
    throw new Error("GPT 응답이 올바른 JSON이 아니에요.");
  }
};
