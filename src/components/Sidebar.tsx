import { FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsJournalText, BsJournalBookmark } from "react-icons/bs";
import SidebarLink from "./SidebarLink";

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
        <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3 px-3">
          Bot 리스트
        </h3>

        {/* 메뉴 항목들 */}
        <div className="space-y-2">
          <SidebarLink
            href="/todo-bot"
            title="할 일 봇"
            description="Notion에 할 일 자동등록"
            icon={<FaClipboardList size={16} />}
          />
          <SidebarLink
            href="/memo-bot"
            title="메모 봇"
            description="Notion으로 메모 정리"
            icon={<BsJournalBookmark size={16} />}
          />
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
