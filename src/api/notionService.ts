import { Client } from "@notionhq/client";

const notion = new Client({
  auth: import.meta.env.VITE_NOTION_API_KEY,
});

export const createTodoInNotion = async (todo: { title: string; description: string; startDate: string; endDate: string; group: string }) => {
  return await notion.pages.create({
    parent: { database_id: import.meta.env.VITE_NOTION_DATABASE_ID },
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
          end: todo.startDate === todo.endDate ? todo.endDate : null,
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
