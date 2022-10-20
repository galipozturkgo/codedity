import path from "path";
import cors from "cors";
import express from "express";
import { createCellsRouter } from "./routes/cells";
import { createProxyMiddleware } from "http-proxy-middleware";

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean,
) => {
  const app = express();

  app.use(cors());
  app.use(createCellsRouter(filename, dir));

  if (useProxy) {
    app.use(
      createProxyMiddleware(
        '/',
        {
          target: "http://localhost:3000/",
          ws: true,
          logLevel: "silent",
        }
      )
    );
  } else {
    const packagePath = require.resolve("local-client/build/index.html");
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
