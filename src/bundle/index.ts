
import * as esbuild from "esbuild-wasm";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

export interface BundleOutputProps {
  code: string,
  error: string,
}

let initialized: boolean = false;

const initialize = async () => {
  await esbuild.initialize({
    worker: true,
    wasmURL: "https://unpkg.com/esbuild-wasm@0.15.10/esbuild.wasm",
  }).then(() => initialized = true);
}

initialize();

const bundle = async (rawCode: string) => {
  if (!initialized) return { code: "", error: "" };

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
      jsxFactory: "_React.createElement",
      jsxFragment: "_React.Fragment",
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

export default bundle;
