import path from "path";
import { serve } from "local-api";
import { Command } from "commander";

interface LocalApiError {
  code: string;
}

const isProduction = process.env.NODE_ENV === "production";

export const serveCommands = new Command();

serveCommands
  .name("serve")
  .argument("[filename]")
  .option("-p, --port <number>", "port number", "3095")
  .action((filename = "notebook.js", options) => {
    const port = parseInt(options.port);
    const dir = path.join(process.cwd(), path.dirname(filename));
    const isLocalApiError = (err: any): err is LocalApiError => typeof err.code === "string";

    serve(port, filename, dir, !isProduction)
      .then(() => {
        console.log(`Opened ${filename}. Navigate to http://localhost:${port} to edit the file.`)
      })
      .catch((err) => {
        if (isLocalApiError(err)) {
          if (err.code === "EADDRINUSE") {
            console.error("Port is in use. Try running on a different port.");
          }
        } else if (err instanceof Error) {
          console.log("Heres the problem", err.message);
        } else {
          process.exit(1);
        }
      })
  });
