import { Router } from "express";
import notionRouter from "./notion";
import gptRouter from "./gpt";

const appRouter = Router();
appRouter.use("/notion", notionRouter);
appRouter.use("/gpt", gptRouter);

export default appRouter;
