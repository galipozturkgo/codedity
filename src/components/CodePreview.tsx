import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';

interface CodePreviewProps {
  code: string;
}

const Preview = styled.iframe({
  width: "100%",
  background: "gray",
  border: 0,
})

const CodePreview: React.FC<CodePreviewProps> = ({ code }) => {
  const iframe = useRef<HTMLIFrameElement | null>(null);
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

  useEffect(() => {
    if (!iframe.current?.contentWindow) return;
    if (iframe.current.srcdoc !== html) iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code, html])


  return <Preview
    ref={iframe}
    title="codeCodepreview"
    sandbox="allow-scripts"
    srcDoc={html}
  />
}

export default CodePreview
