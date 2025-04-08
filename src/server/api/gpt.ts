import { Router } from "express";
import { getGptMemoResponse, getGptTodoResponse } from "../services/gptService";

const gptRouter = Router();

gptRouter.post("/chat-todo", async (req, res) => {
  const { prompt } = req.body;

  try {
    const gptResult = await getGptTodoResponse(prompt);
    res.status(200).json({ ok: true, message: "GPT 응답 분석 피니쉬", data: gptResult });
  } catch (error) {
    const err = error instanceof Error ? error.message : String(error);
    console.error("Error", err);
    res.status(500).json({ ok: false, message: "에러가 떳습니다..", error: err });
  }
});

gptRouter.post("/chat-memo", async (req, res) => {
  const { prompt } = req.body;
  try {
    const gptResult = await getGptMemoResponse(prompt);
    res.status(200).json({ ok: true, message: "GPT 메모 응답 분석 피니쉬", data: gptResult });
  } catch (error) {
    const err = error instanceof Error ? error.message : String(error);
    console.error("Error", err);
    res.status(500).json({ ok: false, message: "에러가 떳습니다..", error: err });
  }
});

export default gptRouter;
