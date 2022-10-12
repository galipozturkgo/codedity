import useBundler from "../bundler";
import Resizable from "./Resizable";
import CodeEditor from "./CodeEditor";
import styled from "styled-components";
import CodePreview from "./CodePreview";
import { useEffect, useState } from 'react';

const Container = styled.div({
  height: "100%",
  display: "flex",
  flexDirection: "row",
})

const Code = () => {
  const [loading, output, build] = useBundler();
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => build(input), 500);
    return () => clearTimeout(timer);
  }, [input, build]);

  return <Resizable direction="vertical">
    <Container>
      <Resizable direction="horizontal">
        <CodeEditor
          value={input}
          loading={loading}
          onChange={setInput}
        />
      </Resizable>
      <CodePreview
        code={output}
      />
    </Container>
  </Resizable>;
}

export default Code
