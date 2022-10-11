
import * as esbuild from "esbuild-wasm";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

const initialize = async () => {
  await esbuild.initialize({
    worker: true,
    wasmURL: "https://unpkg.com/esbuild-wasm@0.15.10/esbuild.wasm",
  })
}

const bundle = async (rawCode: string) => {
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
  return res.outputFiles[0].text;
}

initialize();

export default bundle;
