import path from "path";
import fs from "fs/promises";
import express from "express";

interface LocalApiError {
  code: string;
}

interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());
  const fullPath = path.join(dir, filename);
  const isLocalApiError = (err: any): err is LocalApiError => typeof err.code === "string";

  router.get("/cells", async (req, res) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });
      res.send(JSON.parse(result));
    } catch (err) {
      if (isLocalApiError(err)) {
        if (err.code === "ENOENT") {
          await fs.writeFile(fullPath, "[]", "utf-8");
          res.send([]);
        }
      } else {
        throw err;
      }
    }
  });

  router.post("/cells", async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;
    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");
    res.send({ status: "ok" });
  });

  return router;
}
