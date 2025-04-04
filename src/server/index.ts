import express from "express";
import appRouter from "./api";
import cors from "cors";

const server = await (async () => {
  const app = express();
  const PORT = import.meta.env.VITE_SERVER_PORT || 3000;

  app.use(cors());
  app.use(express.json());
  app.use("/api", appRouter);

  return app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
})();

(() => {
  if (import.meta.hot) {
    import.meta.hot.accept(async () => {
      server.close();
    });
  }
})();
