import "./App.css"
import bundler from "./bundler";
import { useState } from 'react';
import styled from "styled-components";
import CodeEditor from "./components/CodeEditor";
import CodePreview from "./components/CodePreview";

const Root = styled.div({
})

const App = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const onClick = async () => setOutput(await bundler(input));

  return <Root>
    <CodeEditor
      value={input}
      onBundle={onClick}
      onChange={setInput}
    />
    <CodePreview
      code={output}
    />
  </Root>;
}

export default App
