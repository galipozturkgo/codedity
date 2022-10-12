import bundler from "../bundler";
import { useState } from 'react';
import CodeEditor from "./CodeEditor";
import styled from "styled-components";
import CodePreview from "./CodePreview";
import Resizable from "./Resizable";

const Container = styled.div({
  height: "100%",
  display: "flex",
  flexDirection: "row",
})

const Code = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const onClick = async () => setOutput(await bundler(input));

  return <Resizable direction="vertical">
    <Container>
      <Resizable direction="horizontal">
        <CodeEditor
          value={input}
          onBundle={onClick}
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
