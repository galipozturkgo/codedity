import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from 'react';
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

const App = () => {
  const [input, setInput] = useState("");
  const iframe = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => { startService(); }, [])

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.15.10/esbuild.wasm",
    })
  }

  const onClick = async () => {
    if (!iframe.current?.contentWindow) return null;

    iframe.current.srcdoc = html;

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

    iframe.current.contentWindow.postMessage(res.outputFiles[0].text, "*");
  }


  const html = `
  <html>
    <head>
    </head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', (event) => { 
          try {
            eval(event.data); 
          }
          catch (err) {
            const root = document.getElementById('root');
            root.innerHTML = '<div style="color : red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          }
        }, false);
      </script>
    </body>
  </html>
`

  return <div>
    <textarea
      rows={10}
      cols={40}
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
    <div>
      <button onClick={onClick}>
        Submit
      </button>
    </div>
    <iframe ref={iframe} title="codepreview" sandbox="allow-scripts" srcDoc={html} />
  </div>;
}

export default App
