import { styled } from "@mui/material";
import useBundler from "bundler";
import Loading from "components/shared/Loading";
import Resizable from "components/shared/Resizable";
import { useState, useEffect } from "react";
import CodeEditor from "./CodeEditor";
import CodePreview from "./CodePreview";

const Container = styled("div")({
  height: "100%",
  display: "flex",
  flexDirection: "row",
});

const LoadingLayout = styled("div")({
  position: "absolute",
  width: window.innerWidth,
  height: window.innerHeight,
  zIndex: 400,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#37414b",
})

const Code = () => {
  const [output, build] = useBundler();
  const [input, setInput] = useState<string>("");
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => build(input), 500);
    return () => clearTimeout(timer);
  }, [input, build]);

  return <Resizable direction="vertical">
    <Container>
      {!initialized && <LoadingLayout>
        <Loading />
      </LoadingLayout>}

      <Resizable direction="horizontal">
        <CodeEditor
          value={input}
          onMount={() => setInitialized(true)}
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
