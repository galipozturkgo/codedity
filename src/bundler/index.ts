
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

const useBundler = (): [boolean, string, (rawCode: string) => void] => {
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const build = async (rawCode: string) => {
    try {
      setLoading(true);
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
    } catch {
    }
    finally {
      setLoading(false);
    }
  }

  return [loading, output, build]
}

initialize();

export default useBundler;
