import { useState } from "react";
import { useTodoStore } from "../../store/todoStore";
import ParsedPreview from "./ParsedPreview";
import { getGptTodoResponse } from "../../api/apiClient";
import { isValidTodo } from "../../utils/validation";
import Textarea from "../../components/Textarea";
import PrimaryButton from "../../components/PrimaryButton";
import Topbar from "../../components/Topbar";
import SEO from "../../components/SEO";

export default function TodoInputBox() {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");

  const { todo, setGptResult } = useTodoStore();

  const handleSubmit = async () => {
    if (!input.trim()) {
      alert("할 일을 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      const parsedTodo = await getGptTodoResponse(input);
      if (!isValidTodo(parsedTodo)) {
        alert("GPT가 똥을 쌌네요..");
        return;
      }
      setGptResult(parsedTodo);
    } catch (error: unknown) {
      console.error("Error", error);
      alert("에러 떳네요... 다시 고고");
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
            {!todo ? (
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
                  className={`${isLoading ? "opacity-80 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? "로딩 중..." : "GPT에게 요청하기"}
                </PrimaryButton>
              </>
            ) : (
              <ParsedPreview />
            )}
          </div>
        </main>
      </div>
    </>
  );
}
