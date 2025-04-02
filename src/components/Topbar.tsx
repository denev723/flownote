import { FaBars, FaTimes } from "react-icons/fa";

interface Props {
  title?: string;
  isSidebarOpen?: boolean;
}

export default function Topbar({ title = "FlowNote - To Do Bot", isSidebarOpen = true }: Props) {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 w-full shadow-sm">
      {/* 왼쪽: 사이드바 토글 버튼과 로고/타이틀 */}
      <div className="flex items-center gap-3">
        <button
          className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 focus:outline-none transition-colors"
          aria-label={isSidebarOpen ? "사이드바 닫기" : "사이드바 열기"}
        >
          {isSidebarOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>

        <h1 className="text-xl font-semibold text-gray-800 hidden md:block">{title}</h1>
      </div>

      {/* 중앙: 모바일에서만 보이는 페이지 타이틀 */}
      <div className="flex-1 text-center md:hidden">
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      </div>

      {/* 오른쪽: 추가 기능을 위한 공간 */}
      <div className="flex items-center gap-2">{/* 여기에 필요한 버튼이나 알림 등을 추가할 수 있습니다 */}</div>
    </div>
  );
}
