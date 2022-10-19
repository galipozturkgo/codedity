import { styled } from "@mui/material";
import { BundleOutputProps } from "bundle";
import React, { useEffect, useRef } from "react";

const PreviewWrapper = styled("div")({
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

const Preview = styled("iframe")({
  width: "100%",
  height: "100%",
  border: 0,
})

const ErrorWrapper = styled("div")({
  position: "absolute",
  top: 22,
  left: 8,
  color: "red",
})

const CodePreview: React.FC<BundleOutputProps> = ({ code, error }) => {
  const iframe = useRef<HTMLIFrameElement | null>(null);
  const sourceDoc = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      html {
        background-color: white;
      }
    </style>
  </head>
  
  <body>
    <div id="root"></div>
    <script>

      const handleError = (err) => {
        const root = document.getElementById('root');
        root.innerHTML = '<div style="color : red;"><h4>Runtime Error</h4>' + err + '</div>';
        console.error(err);
      }
  
      window.addEventListener("error", (event) => {
        event.preventDefault();
        handleError(event.error || event.message);
      })
  
      window.addEventListener("message", (event) => {
        try {
          eval(event.data);
        }
        catch (err) {
          handleError(err)
        }
      }, false);
    </script>
  </body>
  
  </html>`;

  useEffect(() => {
    if (!iframe.current?.contentWindow) return;
    iframe.current.srcdoc = sourceDoc;
    setTimeout(() => iframe.current?.contentWindow?.postMessage(code, "*"), 50);
  }, [sourceDoc, code])

  return <PreviewWrapper>
    <Preview
      ref={iframe}
      title="codeCodepreview"
      sandbox="allow-scripts"
      srcDoc={sourceDoc}
    />
    {error && <ErrorWrapper>{error}</ErrorWrapper>}
  </PreviewWrapper>
}

export default CodePreview
