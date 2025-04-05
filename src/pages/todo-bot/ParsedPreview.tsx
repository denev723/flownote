import { FaRegCalendarAlt, FaRegCheckCircle, FaRegFileAlt } from "react-icons/fa";
import PrimaryButton from "../../components/PrimaryButton";
import { FormEvent, useState } from "react";
import { useTodoStore } from "../../store/todoStore";
import { useNavigate } from "react-router-dom";
import { createTodo } from "../../api/apiClient";
import Input from "../../components/Input";
import RadioGroup from "../../components/RadioGroup";

export default function ParsedPreview() {
  const navigate = useNavigate();
  const groupOptions = ["할 일", "진행 중", "완료 🙌"];

  const { todo, setGptResult, resetGptResult } = useTodoStore();
  const [status, setStatus] = useState<string>(todo?.status || "할 일");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newTodo = {
      title: formData.get("todo") as string,
      status: status as "할 일" | "진행 중" | "완료 🙌",
      dueDate: formData.get("dueDate") as string,
    };

    try {
      await createTodo(newTodo);
      alert("📌 노션에 할 일이 성공적으로 등록됐어요!");
      resetGptResult();

      navigate("/todo-bot");
    } catch (error) {
      setGptResult(newTodo);
      console.error(error);
      alert("⚠️ 노션 등록 중 오류가 발생했어요!");
    }
  };

  const handleCancel = () => {
    if (confirm("정말 취소하시겠어요?")) {
      resetGptResult();
      navigate("/todo-bot");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-10 bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-xl border border-blue-100">
      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* 할 일 제목 입력 필드 */}
        <Input
          id="todo"
          name="todo"
          label="할 일"
          icon={<FaRegFileAlt className="text-primary" />}
          defaultValue={todo?.title || ""}
          required
          placeholder="할 일 제목을 입력하세요"
        />

        {/* 상태 선택 필드 */}
        <RadioGroup
          name="status"
          label="상태"
          icon={<FaRegCheckCircle className="text-green-500" />}
          options={groupOptions.map((option) => ({
            value: option,
            label: option,
          }))}
          value={status}
          onChange={setStatus}
          columns={3}
        />

        {/* 마감일 선택 필드 */}
        <Input
          type="date"
          id="dueDate"
          name="dueDate"
          label="마감일"
          icon={<FaRegCalendarAlt className="text-red-500" />}
          defaultValue={todo?.dueDate || new Date().toISOString().split("T")[0]}
          required
        />
        {/* 등록 버튼 */}
        <div className="pt-4 flex gap-4">
          <PrimaryButton type="submit" className="w-2/3 h-16 text-xl font-medium">
            등록하기
          </PrimaryButton>
          <button
            type="button"
            onClick={handleCancel}
            className="w-1/3 h-16 text-xl font-medium rounded-lg cursor-pointer border-2 border-gray-300 text-gray-500 
                     hover:bg-gray-100 hover:border-gray-400 hover:text-gray-700 
                     active:bg-gray-200 
                     transition-all duration-200 shadow-sm hover:shadow"
          >
            취소하기
          </button>
        </div>
      </form>
    </div>
  );
}
