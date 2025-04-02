import { FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsJournalText } from "react-icons/bs";

export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 w-64 h-screen shadow-lg flex flex-col bg-gradient-to-b from-blue-50 to-white z-10">
      {/* 로고 영역 - 더 눈에 띄는 디자인 */}
      <Link to="/" className="px-4 py-6 text-center flex flex-col items-center">
        <div className="bg-blue-100 p-3 rounded-full shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <BsJournalText
            size={40}
            color="#3b82f6" // blue-500으로 변경
            style={{ display: "block" }}
          />
        </div>
        <h1 className="font-bold text-lg mt-3 text-blue-600">Flownote</h1>
        <p className="text-xs text-blue-400">개인 자동화 봇</p>
      </Link>

      {/* 구분선 - 색상이 있는 디자이너 구분선 */}
      <div className="px-4 py-1">
        <div className="h-[2px] bg-gradient-to-r from-blue-100 via-blue-300 to-blue-100 rounded-full"></div>
      </div>

      {/* 메뉴 영역 */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3 px-3">Bot 리스트</h3>

        {/* 메뉴 항목들 */}
        <div className="space-y-2">
          <Link
            to="/todo-bot"
            className="w-full py-3 px-4 rounded-lg flex items-center gap-3
              bg-white shadow-sm hover:shadow-md hover:bg-blue-50
              active:bg-blue-100 transition-all duration-200
              relative overflow-hidden border border-transparent hover:border-blue-200 group"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-500 group-hover:bg-blue-200 transition-all">
              <FaClipboardList size={16} />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">할 일 봇</span>
              <span className="text-xs text-gray-400 group-hover:text-blue-400 transition-colors">Notion 할 일 자동등록</span>
            </div>
          </Link>
        </div>
      </div>

      {/* 하단 정보 영역 */}
      <div className="mt-auto border-t border-blue-100 p-4 bg-blue-50 bg-opacity-50">
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center px-2 py-1 bg-white rounded-full shadow-sm">
            <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
            <span className="text-xs font-medium text-blue-600">온라인</span>
          </div>
        </div>
        <div className="text-xs text-blue-400 text-center mt-2">v0.1.0 &copy; flownote</div>
      </div>
    </div>
  );
}
