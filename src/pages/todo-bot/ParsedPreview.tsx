import { FaRegCalendarAlt, FaRegCheckCircle, FaRegFileAlt } from "react-icons/fa";
import PrimaryButton from "../../components/PrimaryButton";
import { FormEvent } from "react";
import { useTodoStore } from "../../store/todoStore";
import { useNavigate } from "react-router-dom";
import { createTodo } from "../../api/apiClient";
import { GroupType } from "../../types";

export default function ParsedPreview() {
  const navigate = useNavigate();
  const groupOptions = ["개인", "회사", "프로젝트", "기타"];

  const { todo, resetGptResult } = useTodoStore();

  const getNowDateTimeString = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // 시간 보정
    return now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm 형식
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newTodo = {
      title: formData.get("todo") as string,
      description: formData.get("desc") as string,
      startDate: formData.get("from") as string,
      endDate: formData.get("to") as string,
      group: formData.get("group") as GroupType,
    };

    try {
      await createTodo(newTodo);
      alert("📌 노션에 할 일이 성공적으로 등록됐어요!");
      resetGptResult();

      navigate("/todo-bot");
    } catch (error) {
      console.error(error);
      alert("⚠️ 노션 등록 중 오류가 발생했어요!");
    }
  };

  const handleCancel = () => {
    if (confirm("정말 취소할것인가?")) {
      resetGptResult();
      navigate("/todo-bot");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-10 bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-xl border border-blue-100">
      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* 할 일 입력 - 디자인 개선 */}
        <div className="space-y-2">
          <label htmlFor="todo" className="flex items-center gap-2 text-lg font-semibold text-blue-600 mb-2">
            <FaRegCheckCircle className="text-blue-500" />
            <span>할 일</span>
          </label>
          <input
            name="todo"
            id="todo"
            type="text"
            defaultValue={todo?.title}
            required
            className="input input-bordered w-full h-16 text-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm px-5 rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="desc" className="flex items-center gap-2 text-lg font-semibold text-blue-600 mb-2">
            <FaRegFileAlt className="text-blue-500" />
            <span>설 명</span>
          </label>
          <input
            name="desc"
            id="desc"
            type="text"
            defaultValue={todo?.description}
            className="input input-bordered w-full h-16 text-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm px-5 rounded-lg"
          />
        </div>

        {/* 기간 선택 - 2칸 그리드로 변경 */}
        <div className="space-y-6">
          <div className="w-full">
            <label htmlFor="from" className="flex items-center gap-2 text-lg font-semibold text-blue-600 mb-2">
              <FaRegCalendarAlt className="text-blue-500" />
              <span>시작 일자</span>
            </label>
            <input
              name="from"
              id="from"
              type="datetime-local"
              defaultValue={todo?.startDate && todo.startDate !== "" ? todo.startDate : getNowDateTimeString()}
              className="input input-bordered w-full h-16 text-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm px-5 rounded-lg"
            />
          </div>

          <div className="w-full">
            <label htmlFor="to" className="flex items-center gap-2 text-lg font-semibold text-blue-600 mb-2">
              <FaRegCalendarAlt className="text-blue-500" />
              <span>종료 일자</span>
            </label>
            <input
              name="to"
              id="to"
              type="datetime-local"
              defaultValue={todo?.endDate && todo.endDate !== "" ? todo.endDate : getNowDateTimeString()}
              className="input input-bordered w-full h-16 text-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm px-5 rounded-lg"
            />
          </div>
        </div>

        {/* 그룹 선택 - 디자인 개선 */}
        <fieldset className="space-y-3">
          <legend className="flex items-center gap-2 text-lg font-semibold text-blue-600 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
            </svg>
            <span>그룹</span>
          </legend>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {groupOptions.map((option, idx) => (
              <label
                key={idx}
                htmlFor={`group-${idx + 1}`}
                className="flex items-center justify-center h-16 px-4 rounded-lg border-2 border-blue-200 
                  cursor-pointer transition-all duration-200
                  hover:bg-blue-100 hover:border-blue-300
                  has-[:checked]:bg-blue-400 has-[:checked]:text-white has-[:checked]:border-blue-400"
              >
                <input type="radio" name="group" id={`group-${idx + 1}`} value={option} required className="sr-only" defaultChecked={todo?.group ? todo.group === option : option === "기타"} />
                <span className="text-lg font-medium">{option}</span>
              </label>
            ))}
          </div>
        </fieldset>

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
