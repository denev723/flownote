import { Router } from "express";
import { GPTTodo } from "../../types";
import { createTodoInNotion, getDatabaseProperties } from "../services/notionService";
import { formatNotionIdToUUID } from "../../utils/formatNotionId";

const notionRouter = Router();

notionRouter.post("/createTodo", async (req, res) => {
  const todo = req.body as GPTTodo;

  try {
    await createTodoInNotion(todo);
    res.status(200).json({ ok: true, message: "노션 등록 완료" });
  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : String(error);
    console.error("Error", err);
    res.status(500).json({ ok: false, message: "에러 떳다..", error: err });
  }
});

notionRouter.get("/props", async (_, res) => {
  try {
    const dbid = formatNotionIdToUUID("1caa25c64e8580f4b138cad53aac1655");
    const props = await getDatabaseProperties(dbid);
    res.status(200).json({ ok: true, messagae: "속성 정보 가져오기 성공", data: props });
  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : String(error);
    console.error("Error", err);
    res.status(500).json({ ok: false, message: "에러 떳다..", error: err });
  }
});

export default notionRouter;
