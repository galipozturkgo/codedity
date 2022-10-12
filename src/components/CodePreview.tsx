import styled from 'styled-components';
import React, { useEffect, useRef } from 'react'

interface CodePreviewProps {
  code: string;
}

const PreviewWrapper = styled.div({
  position: "relative",
  height: "100%",
  flexGrow: 1,
  "&:after": {
    content: "''",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0,
  }
})

const Preview = styled.iframe({
  width: "100%",
  height: "100%",
  border: 0,
})

const CodePreview: React.FC<CodePreviewProps> = ({ code }) => {
  const iframe = useRef<HTMLIFrameElement | null>(null);
  const html = `
  <html>
    <head>
      <style>
        html { background-color: white; }
      </style>
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
    setTimeout(() => iframe.current?.contentWindow?.postMessage(code, "*"), 50);
  }, [code, html])

  return <PreviewWrapper>
    <Preview
      ref={iframe}
      title="codeCodepreview"
      sandbox="allow-scripts"
      srcDoc={html}
    />
  </PreviewWrapper>
}

export default CodePreview
