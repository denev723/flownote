import { Client } from "@notionhq/client";
import { formatNotionIdToUUID } from "../../utils/formatNotionId";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const createTodoInNotion = async (todo: {
  title: string;
  status: "할 일" | "진행 중" | "완료 🙌";
  dueDate: string;
}) => {
  if (!process.env.NOTION_TODO_DATABASE_ID) {
    throw new Error("NOTION_TODO_DATABASE_ID 환경 변수가 설정되지 않았습니다.");
  }

  console.log("1caa25c64e8580f4b138cad53aac1655");
  console.log(formatNotionIdToUUID("1caa25c64e8580f4b138cad53aac1655"));

  return await notion.pages.create({
    parent: { database_id: formatNotionIdToUUID("1caa25c64e8580f4b138cad53aac1655") as string },
    properties: {
      제목: {
        title: [
          {
            text: {
              content: todo.title,
            },
          },
        ],
      },
      상태: {
        status: {
          name: todo.status || "할 일",
        },
      },
      마감일: {
        date: {
          start: todo.dueDate,
        },
      },
    },
  });
};

export const getDatabaseProperties = async (databaseId: string) => {
  try {
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    });
    console.log("[🧾 Notion 속성 정보]", response.properties);
    return response.properties;
  } catch (error) {
    console.error("[❗DB 속성 가져오기 실패]", error);
    throw error;
  }
};
