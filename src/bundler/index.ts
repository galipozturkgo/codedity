
import * as esbuild from "esbuild-wasm";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

export interface BundlerOutputProps {
  code: string,
  error: string,
}

const initialize = async () => {
  await esbuild.initialize({
    worker: true,
    wasmURL: "https://unpkg.com/esbuild-wasm@0.15.10/esbuild.wasm",
  })
}

const bundler = async (rawCode: string) => {
  try {
    const res = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(rawCode),
      ],
      define: {
        "process.env.NODE_ENV": '"production"',
      },
    });
    return {
      code: res.outputFiles[0].text,
      error: "",
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        code: "",
        error: err.message,
      };
    }
    throw err;
  }
}

initialize();

export default bundler;
