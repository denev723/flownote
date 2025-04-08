import { Router } from "express";
import { Todo } from "../../types";
import {
  createMemoInNotion,
  createTodoInNotion,
  getDatabaseProperties,
} from "../services/notionService";

const notionRouter = Router();

notionRouter.post("/create-todo", async (req, res) => {
  const todo = req.body as Todo;

  try {
    await createTodoInNotion(todo);
    res.status(200).json({ ok: true, message: "노션 등록 완료" });
  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : String(error);
    console.error("Error", err);
    res.status(500).json({ ok: false, message: "에러 떳다..", error: err });
  }
});

notionRouter.post("/create-memo", async (req, res) => {
  const todo = req.body as Todo;

  try {
    await createMemoInNotion(todo);
    res.status(200).json({ ok: true, message: "노션 등록 완료" });
  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : String(error);
    console.error("Error", err);
    res.status(500).json({ ok: false, message: "에러 떳다..", error: err });
  }
});

notionRouter.get("/props", async (_, res) => {
  try {
    const dbid = "1cda25c6-4e85-81a9-8de6-c37c3eaaed93";
    const props = await getDatabaseProperties(dbid);
    res.status(200).json({ ok: true, message: "속성 정보 가져오기 성공", data: props });
  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : String(error);
    console.error("Error", err);
    res.status(500).json({ ok: false, message: "에러 떳다..", error: err });
  }
});

export default notionRouter;
