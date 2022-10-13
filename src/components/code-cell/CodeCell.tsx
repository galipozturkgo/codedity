import CodeEditor from "./CodeEditor";
import { styled } from "@mui/material";
import CodePreview from "./CodePreview";
import { useState, useEffect } from "react";
import Resizable from "components/shared/Resizable";
import bundler, { BundlerOutputProps } from "bundler";

const Container = styled("div")({
  height: "100%",
  display: "flex",
  flexDirection: "row",
});

const CodeCell = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<BundlerOutputProps>({ code: "", error: "" });

  useEffect(() => {
    const timer = setTimeout(async () => setOutput(await bundler(input)), 500);
    return () => clearTimeout(timer);
  }, [input]);

  return <Resizable direction="vertical">
    <Container>
      <Resizable direction="horizontal">
        <CodeEditor
          value={input}
          onChange={setInput}
        />
      </Resizable>
      <CodePreview {...output} />
    </Container>
  </Resizable>;
}

export default CodeCell
