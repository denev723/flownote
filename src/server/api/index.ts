import { Router } from "express";
import notionRouter from "./notion";
import gptRouter from "./gpt";
import newsRouter from "./news";

const appRouter = Router();
appRouter.use("/notion", notionRouter);
appRouter.use("/gpt", gptRouter);
appRouter.use("/news", newsRouter);

export default appRouter;
