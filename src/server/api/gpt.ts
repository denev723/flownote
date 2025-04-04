import { Router } from "express";
import { getChatGptResponse } from "../services/gptService";

const gptRouter = Router();

gptRouter.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  try {
    const gptResult = await getChatGptResponse(prompt);
    res.status(200).json({ ok: true, message: "GPT 응답 분석 피니쉬", data: gptResult });
  } catch (error) {
    const err = error instanceof Error ? error.message : String(error);
    console.error("Error", err);
    res.status(500).json({ ok: false, message: "에러 떳다..", error: err });
  }
});

export default gptRouter;
