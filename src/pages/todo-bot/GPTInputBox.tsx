import OpenAI from "openai";
import { useState } from "react";
import { useTodoStore } from "../../store/todoStore";
import ParsedPreview from "./ParsedPreview";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function GPTInputBox() {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");

  const { todo, setGptResult } = useTodoStore();

  const handleSubmit = async () => {
    if (!input.trim()) {
      alert("할 일을 입력하거라~!");
      return;
    }

    setIsLoading(true);

    try {
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
            content: input,
          },
        ],
        temperature: 0.4,
        max_tokens: 400,
      });

      const getResponse = chatCompletion.choices[0].message.content;
      if (!getResponse) {
        alert("응답이 없습니다.");
        return;
      }

      const parsedRes = JSON.parse(getResponse);
      setGptResult(parsedRes);
    } catch (error: unknown) {
      console.error("Error", error);
      alert("에러가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }

    setInput("");
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-xl mx-auto mt-8">
      {!todo ? (
        <>
          <textarea
            className="p-3 border rounded resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="예: 내일 오전 10시에 회의 잡아줘"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600 transition ${
              isLoading ? "disabled:bg-gray-400 disabled:opacity-80 disabled: cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
          >
            {isLoading ? "로딩 중..." : "GPT에게 요청하기"}
          </button>
        </>
      ) : (
        <ParsedPreview />
      )}
    </div>
  );
}
