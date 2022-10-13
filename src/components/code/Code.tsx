import CodeEditor from "./CodeEditor";
import { styled } from "@mui/material";
import CodePreview from "./CodePreview";
import { useState, useEffect } from "react";
import Loading from "components/shared/Loading";
import Resizable from "components/shared/Resizable";
import bundler, { BundlerOutputProps } from "bundler";

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
  const [input, setInput] = useState<string>("");
  const [initialized, setInitialized] = useState<boolean>(false);
  const [output, setOutput] = useState<BundlerOutputProps>({ code: "", error: "" });

  useEffect(() => {
    const timer = setTimeout(async () => setOutput(await bundler(input)), 500);
    return () => clearTimeout(timer);
  }, [input]);

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
      <CodePreview {...output} />
    </Container>
  </Resizable>;
}

export default Code
