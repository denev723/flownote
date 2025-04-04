import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
                  "title": "할 일 제목",
                  "description": "상세 설명",
                  "startDate": "YYYY-MM-DDTHH:mm:ss",
                  "endDate": "YYYY-MM-DDTHH:mm:ss",
                  "group": "개인 | 회사 | 프로젝트 | 기타"
                  }
      
                  주의사항:
                  - 반드시 JSON만 응답해. 설명 문장 금지!
                  - 날짜는 한국 기준으로 해석해.
                  - 시간대가 없으면 하루 종일 일정으로 처리해.
                  - 그룹은 없으면 '기타'로 설정해.
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
