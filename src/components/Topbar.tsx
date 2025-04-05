import { FaBell, FaLightbulb, FaQuestionCircle, FaStream, FaUser } from "react-icons/fa";

interface Props {
  title: string;
}

export default function Topbar({ title }: Props) {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 w-full shadow-sm">
      <div className="flex items-center gap-3">
        <FaStream className="text-blue-500 text-xl cursor-pointer hover:text-blue-600" />
        <h1 className="text-xl font-semibold text-gray-800 hidden md:block">{title}</h1>
      </div>

      {/* 중앙: 모바일에서만 보이는 페이지 타이틀 */}
      <div className="flex-1 text-center md:hidden">
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      </div>

      {/* 오른쪽: 추가 기능을 위한 공간 */}
      <div className="flex items-center gap-4">
        <FaLightbulb
          className="text-amber-500 text-xl cursor-pointer hover:text-amber-600"
          title="팁"
        />
        <FaQuestionCircle
          className="text-blue-500 text-xl cursor-pointer hover:text-blue-600"
          title="도움말"
        />
        <div className="relative">
          <FaBell
            className="text-gray-600 text-xl cursor-pointer hover:text-gray-800"
            title="알림"
          />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            2
          </span>
        </div>
        <div className="h-8 w-8 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600">
          <FaUser />
        </div>
      </div>
    </div>
  );
}
