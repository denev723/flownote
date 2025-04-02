import { FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsJournalText } from "react-icons/bs";

export default function Sidebar() {
  return (
    <div className="drawer-side bg-base-200 w-64 min-h-screen shadow-lg flex flex-col">
      {/* 로고 영역 */}
      <Link to="/" className="px-4 py-6 text-center flex flex-col items-center">
        <BsJournalText
          size={40} // 명시적인 크기 지정
          color="#0369a1" // 명시적인 색상 지정 (파란색)
          style={{ display: "block" }} // 명시적인 display 속성
        />
        <h1 className="font-bold text-lg mt-2">Flownote</h1>
        <p className="text-xs text-base-content/60">할 일 자동화 비서</p>
      </Link>

      {/* 구분선 */}
      <div className="divider mx-4 my-1"></div>

      {/* 메뉴 영역 */}
      <div className="flex-1 overflow-y-auto">
        <ul className="menu menu-md p-4 text-base-content">
          <li className="menu-title text-xs opacity-60 font-medium">Bot 리스트</li>
          <li>
            <Link
              to="/todo-bot"
              className="w-full py-3 px-4 rounded-lg flex items-center gap-2 
                hover:bg-base-300 hover:text-primary hover:shadow-md 
                active:bg-primary/20 transition-all duration-200
                relative group overflow-hidden"
            >
              <div className="absolute inset-0 w-0 bg-primary opacity-10 transition-all duration-300 group-hover:w-full"></div>
              <FaClipboardList className="text-primary transition-transform" />
              <span className="font-medium transition-transform">할 일 봇</span>
              {/* <span className="badge badge-sm badge-primary ml-auto">3</span> */}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        </ul>
      </div>

      {/* 하단 정보 영역 */}
      <div className="mt-auto border-t border-base-300 p-4">
        <div className="text-xs opacity-50 text-center">v0.1.0 &copy; flownote</div>
      </div>
    </div>
  );
}
