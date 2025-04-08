import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import SEO from "../../components/SEO";
import Textarea from "../../components/Textarea";
import Topbar from "../../components/Topbar";
import { createMemo, getGptMemoResponse } from "../../api/apiClient";
import { parseGPTMemo } from "../../utils/parseGPTMemo";
import Complete from "../../components/Complete";

export default function MemoInputbox() {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    if (!input.trim()) {
      alert("메모 또는 회의 내용을 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      const memoResult = await getGptMemoResponse(input);
      const parsedMemo = parseGPTMemo(memoResult);

      await createMemo(parsedMemo);

      setIsComplete(true);
    } finally {
      setIsLoading(false);
    }

    setInput("");
  };

  return (
    <>
      <SEO
        title="FlowNote - Memo Bot"
        description="GPT를 활용한 메모 생성 및 정리 서비스"
        keywords="gpt, memo, 메모 생성, 메모 정리, ai"
      />
      <div className="flex flex-col flex-1 ml-64 overflow-hidden">
        <Topbar title="FlowNote - Memo Bot" />
        <main className="flex-1 p-4 pb-16 overflow-auto">
          <div className="flex flex-col gap-2 w-full max-w-xl mx-auto mt-8">
            {!isComplete ? (
              <>
                <Textarea
                  placeholder="회의 내용 및 떠오르는 생각 등 메모 할 내용을 입력해주세요."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="h-40"
                />
                <div className="text-sm text-gray-500 mb-2">
                  <p>✓ 예시: "회의 내용 정리", "아이디어 정리"</p>
                  <p>✓ 리스트나 체크박스 형태로도 저장이 가능합니다.</p>
                </div>
                <PrimaryButton
                  type="button"
                  disabled={isLoading}
                  onClick={handleSubmit}
                  isLoading={isLoading}
                >
                  GPT에게 요청하기
                </PrimaryButton>
              </>
            ) : (
              <Complete
                message="메모 등록이 완료되었습니다."
                linkHref={`https://notion.so/${import.meta.env.VITE_NOTION_MEMO_PAGE_ID}`}
                linkText="Notion 바로가기"
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
}
