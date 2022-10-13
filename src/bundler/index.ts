
import * as esbuild from "esbuild-wasm";
import { useState } from "react";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

const initialize = async () => {
  await esbuild.initialize({
    worker: true,
    wasmURL: "https://unpkg.com/esbuild-wasm@0.15.10/esbuild.wasm",
  })
}

const useBundler = (): [string, (rawCode: string) => void] => {
  const [output, setOutput] = useState<string>("");

  const build = async (rawCode: string) => {
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
      setOutput(res.outputFiles[0].text);
    } catch (err) {
      console.log(err);
    }
  }

  return [output, build]
}

initialize();

export default useBundler;
