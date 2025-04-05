import SEO from "../../components/SEO";
import Topbar from "../../components/Topbar";

export default function DashBoard() {
  return (
    <>
      <SEO
        title="FlowNote"
        description="FlowNote 할 일 등록, 뉴스 모음, 블로그 포스트 아이디어 작성, 메모 생성 등 여러 기능의 봇들의 모음입니다."
      />
      <div className="flex flex-col flex-1 ml-64 overflow-hidden">
        <Topbar title="FlowNote" />
        <main className="flex-1 p-4 pb-16 overflow-auto">
          <h1>DashBoard</h1>
        </main>
      </div>
    </>
  );
}
