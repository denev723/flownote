import { useEffect } from "react";
import Complete from "../../components/Complete";
import SEO from "../../components/SEO";
import Topbar from "../../components/Topbar";
import { useTodoStore } from "../../store/todoStore";

export default function TodoComplete() {
  const { resetComplete } = useTodoStore();

  useEffect(() => {
    return () => resetComplete();
  }, [resetComplete]);

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
          <Complete
            message="할 일 등록이 완료되었습니다."
            linkHref={`https://notion.so/${import.meta.env.VITE_NOTION_TODO_PAGE_ID}`}
            linkText="Notion 바로가기"
          />
        </main>
      </div>
    </>
  );
}
