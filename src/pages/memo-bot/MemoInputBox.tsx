import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import SEO from "../../components/SEO";
import Textarea from "../../components/Textarea";
import Topbar from "../../components/Topbar";

export default function MemoInputbox() {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
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
            <>
              <Textarea
                placeholder="회의 내용 및 떠오르는 생각 등 메모 할 내용을 입력해주세요."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="h-40"
              />
              <PrimaryButton
                type="button"
                disabled={isLoading}
                onClick={handleSubmit}
                className={`${isLoading ? "opacity-80 cursor-not-allowed" : ""}`}
              >
                {isLoading ? "로딩 중..." : "GPT에게 요청하기"}
              </PrimaryButton>
            </>
          </div>
        </main>
      </div>
    </>
  );
}
