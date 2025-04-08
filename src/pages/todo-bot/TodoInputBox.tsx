import { useState } from "react";
import { createTodo, getGptTodoResponse } from "../../api/apiClient";
import Textarea from "../../components/Textarea";
import PrimaryButton from "../../components/PrimaryButton";
import Topbar from "../../components/Topbar";
import SEO from "../../components/SEO";
import Complete from "../../components/Complete";

export default function TodoInputBox() {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    if (!input.trim()) {
      alert("할 일을 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      const gptResult = await getGptTodoResponse(input);
      if (!gptResult) {
        alert("GPT로부터 유효한 응답을 받지 못했습니다.");
        return;
      }

      await createTodo(gptResult);

      setIsComplete(true);
    } finally {
      setIsLoading(false);
    }

    setInput("");
  };

  return (
    <>
      <SEO
        title="FlowNote - Todo Bot"
        description="GPT를 활용한 할 일 생성 서비스"
        keywords="gpt, todo, 할 일 생성, ai"
      />
      <div className="flex flex-col flex-1 ml-64 overflow-hidden">
        <Topbar title="FlowNote - Todo Bot" />
        <main className="flex-1 p-4 pb-16 overflow-auto">
          <div className="flex flex-col gap-2 w-full max-w-xl mx-auto mt-8">
            {!isComplete ? (
              <>
                <Textarea
                  placeholder="일정 및 할 일을 입력해주세요."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="h-40"
                />
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
                message="할 일 등록이 완료되었습니다."
                linkHref={`https://notion.so/${import.meta.env.VITE_NOTION_TODO_PAGE_ID}`}
                linkText="Notion 바로가기"
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
}
