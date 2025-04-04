import { useState } from "react";
import { useTodoStore } from "../../store/todoStore";
import ParsedPreview from "./ParsedPreview";
import { getChatGptResponse } from "../../api/apiClient";
import { isValidTodo } from "../../utils/validation";

export default function GPTInputBox() {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");

  const { todo, setGptResult } = useTodoStore();

  const handleSubmit = async () => {
    if (!input.trim()) {
      alert("할 일을 입력하거라~!");
      return;
    }

    try {
      setIsLoading(true);
      const parsedTodo = await getChatGptResponse(input);
      if (!isValidTodo(parsedTodo)) {
        alert("GPT 똥 쌌다..");
        return;
      }
      setGptResult(parsedTodo);
    } catch (error: unknown) {
      console.error("Error", error);
      alert("에러 떳다... 다시 고고");
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
            className={`bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600 transition disabled:bg-gray-400 disabled:opacity-80 disabled:cursor-not-allowed`}
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
