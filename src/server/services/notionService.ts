import { Client } from "@notionhq/client";
import { GroupType } from "../../types";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const createTodoInNotion = async (todo: {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  group: GroupType;
}) => {
  return await notion.pages.create({
    parent: { database_id: "1caa25c6-4e85-815d-b5f2-c128ac02d9c0" },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: todo.title,
            },
          },
        ],
      },
      그룹: {
        select: {
          name: todo.group,
        },
      },
      시작일: {
        date: {
          start: todo.startDate,
          end: todo.startDate === todo.endDate ? null : todo.endDate,
        },
      },
    },
    children: todo.description
      ? [
          {
            object: "block",
            type: "paragraph",
            paragraph: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: todo.description,
                  },
                },
              ],
            },
          },
        ]
      : [],
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
