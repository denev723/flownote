import OpenAI from "openai";
import dayjs from "dayjs";
import { replaceRelativeDates } from "../../utils/replaceRelativeDates";
import { ProcessedNewsItem, RawNewsItem } from "../../types";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const today = dayjs().format("YYYY-MM-DD");

export const getGptTodoResponse = async (prompt: string) => {
  const preprocessedPrompt = replaceRelativeDates(prompt);

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
        content: preprocessedPrompt,
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

export const getGptMemoResponse = async (prompt: string) => {
  const chatCompletion = await client.chat.completions.create({
    model: "gpt-4-turbo",
    temperature: 0.4,
    max_tokens: 400,
    messages: [
      {
        role: "system",
        content: `
          너는 사용자의 자연어를 분석해서 메모 정보를 추출하는 AI 비서야.  
          응답은 반드시 아래 JSON 형식으로 반환해. 설명 문장 없이 JSON만 응답해.

          {
            "title": "회의 제목",
            "category": "회의",
            "summary": "이 메모의 요약",
            "bullets": ["요약 항목 1", "요약 항목 2"],
            "listType": "list"
          }

          [카테고리 규칙]
          아래 중 하나만 선택해:
          - 회의
          - 아이디어
          - 자기계발
          - 쇼핑
          - 집
          - 메모 (어떤 카테고리에도 명확하지 않다면)

          [요약(summary) 작성 규칙]
          - 전체 내용을 지나치게 축약하지 말고, 핵심 맥락이 전달되도록 적절한 길이로 작성해.
          - 한두 문장 이상의 충분한 정보가 포함되어야 하며, 너무 짧은 요약은 피해야 해.
          - 중복 문장은 제거하고, 핵심 키워드를 중심으로 정리해.

          [listType 판단 규칙]
          - bullets가 없다면 listType은 "none"
          - bullets가 있다면 내용에 따라 다음 중 하나:
            - 할 일(To-do)처럼 명령형이거나 실행 가능한 항목이면: "checkbox"
              (예: "세탁기 돌리기", "우유 사기", "이메일 보내기")
            - 일반적인 요약, 정리 항목이면: "list"
              (예: "UX 개선 방향 논의", "고객 피드백 정리")

          - listType은 반드시 포함하고, 무조건 "none", "list", "checkbox" 중 하나로 정확히 작성해.

          무조건 JSON만 출력하고, 다른 문장은 절대 포함하지 마.
        `,
      },
      { role: "user", content: prompt },
    ],
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

export const getGptNewsResponse = async (feeds: RawNewsItem[]): Promise<ProcessedNewsItem[]> => {
  const chatCompletion = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.4,
    max_tokens: 800,
    messages: [
      {
        role: "system",
        content: `
          너는 프론트엔드 개발 뉴스를 분석하고 가공하는 AI 어시스턴트야.
          주어진 뉴스 피드들을 분석해서 JSON 형식으로 반환해줘.

          다음과 같은 구조로 만들어줘:
          [
            {
              "id": "자동생성된 고유 ID",
              "source": "뉴스 출처 (Javascript Weekly, CSS Weekly, Frontend Focus 중 하나)",
              "publishedDate": "원본 발행일",
              "processedDate": "현재 처리 시각",
              
              "originalTitle": "오리지날 타이틀",
              "title": "가공된 한글 제목",
              "summary": "핵심 내용 요약 (2-3문장)",
              "link": "원본 링크",
              
              "tags": ["관련 기술 태그", "프레임워크", "라이브러리" 등],
              "type": "article" | "release" | "tutorial" | "tool" | "news",
              "status": "new",
            }
          ]

          주의사항:
          - 반드시 JSON만 응답해. 설명 문장 금지!
          - title은 한글로 번역하되, 기술 용어는 원어 유지
          - summary는 한글로 작성하고 핵심 내용을 놓치지 않게 요약
          - tags는 관련된 기술 스택, 도구, 프레임워크 등을 추출
          - type은 내용의 성격에 따라 적절히 분류
        `,
      },
      {
        role: "user",
        content: JSON.stringify(feeds),
      },
    ],
  });

  const getResponse = chatCompletion.choices[0].message.content;

  try {
    const parsedResponse = JSON.parse(getResponse || "[]");
    return parsedResponse;
  } catch (error) {
    console.error("GPT 응답 파싱 오류:", error);
    throw new Error("GPT 응답이 올바른 JSON이 아니에요.");
  }
};
