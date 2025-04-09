import { Router } from "express";
import { processNews } from "../services/newsService";

const newsRouter = Router();

newsRouter.post("/process", async (_, res) => {
  const result = await processNews();
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
});

export default newsRouter;
