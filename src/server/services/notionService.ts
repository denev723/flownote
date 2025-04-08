import { Client } from "@notionhq/client";
import { Memo, Todo } from "../../types";

type RichTextItemRequest = {
  type?: "text";
  text: {
    content: string;
    link?: { url: string } | null;
  };
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    code?: boolean;
    color?:
      | "default"
      | "gray"
      | "brown"
      | "orange"
      | "yellow"
      | "green"
      | "blue"
      | "purple"
      | "pink"
      | "red"
      | "default_background"
      | "gray_background"
      | "brown_background"
      | "orange_background"
      | "yellow_background"
      | "green_background"
      | "blue_background"
      | "purple_background"
      | "pink_background"
      | "red_background";
  };
  plain_text?: string;
};

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const createTodoInNotion = async (todo: Todo) => {
  if (!process.env.NOTION_TODO_DATABASE_ID) {
    throw new Error("NOTION_TODO_DATABASE_ID 환경 변수가 설정되지 않았습니다.");
  }

  return await notion.pages.create({
    parent: { database_id: process.env.NOTION_TODO_DATABASE_ID as string },
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

export const createMemoInNotion = async (memo: Memo) => {
  if (!process.env.NOTION_MEMO_DATABASE_ID) {
    throw new Error("NOTION_MEMO_DATABASE_ID 환경 변수가 설정되지 않았습니다.");
  }

  return await notion.pages.create({
    parent: { database_id: process.env.NOTION_MEMO_DATABASE_ID as string },
    properties: {
      이름: {
        title: [
          {
            text: {
              content: memo.title,
            },
          },
        ],
      },
      카테고리: {
        select: {
          name: memo.category || "회의",
        },
      },
      ...(memo.link
        ? {
            링크: {
              url: memo.link,
            },
          }
        : {}),
    },
    children: [
      {
        object: "block" as const,
        type: "paragraph" as const,
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content: memo.summary || "내용 없음",
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
            },
          ],
        },
      },
      ...(memo.bullets ?? []).map((bullet) => {
        const textBlock: RichTextItemRequest = {
          type: "text",
          text: { content: bullet },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
        };

        if (memo.listType === "checkbox") {
          return {
            object: "block" as const,
            type: "to_do" as const,
            to_do: {
              rich_text: [textBlock],
              checked: false,
            },
          };
        } else if (memo.listType === "list") {
          return {
            object: "block" as const,
            type: "bulleted_list_item" as const,
            bulleted_list_item: {
              rich_text: [textBlock],
            },
          };
        } else {
          return {
            object: "block" as const,
            type: "paragraph" as const,
            paragraph: {
              rich_text: [textBlock],
            },
          };
        }
      }),
    ],
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
