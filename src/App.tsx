import * as esbuild from "esbuild-wasm";
import { useEffect, useState } from 'react';
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => { startService(); }, [])

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.15.10/esbuild.wasm",
    })
  }

  const onClick = async () => {
    const res = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(input),
      ],
      define: {
        "process.env.NODE_ENV": '"production"',
      },
    });

    setCode(res.outputFiles[0].text)
  }

  return <div>
    <textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
    <div>
      <button onClick={onClick}>
        Submit
      </button>
    </div>
    <pre>{code}</pre>
  </div>;
}

export default App
