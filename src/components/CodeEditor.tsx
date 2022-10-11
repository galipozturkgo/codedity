import { useRef } from "react";
import prettier from "prettier";
import monaco from "monaco-editor";
import styled from 'styled-components';
import Editor from "@monaco-editor/react";
import parser from "prettier/parser-babel";

interface CodeEditorProps {
  value: string;
  onBundle: () => void;
  onChange: (value: string) => void;
}

const Container = styled.div({
  position: "relative",
  ":hover": {
    "& button": {
      opacity: 1,
      transition: "ease-in",
      transitionDuration: "100ms",
    }
  }
})

const FormatButton = styled.button({
  position: "absolute",
  zIndex: 10,
  right: 0,
  height: 36,
  width: 100,
  backgroundColor: "red",
  border: "none",
  color: "white",
  fontWeight: 800,
  opacity: 0,
  margin: 4,
  ":hover": {
    cursor: "pointer"
  }
})

const BundleButton = styled.button({
  position: "absolute",
  zIndex: 10,
  right: 106,
  height: 36,
  width: 60,
  backgroundColor: "green",
  border: "none",
  color: "white",
  fontWeight: 800,
  opacity: 0,
  margin: 4,
  ":hover": {
    cursor: "pointer"
  }
})

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onBundle, onChange }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const onMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  }

  const onFormatClick = () => {
    if (!editorRef.current) return;
    const unformatted = editorRef.current.getValue();
    const formatted = prettier.format(unformatted, {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: false,
    }).replace(/\n$/, '');
    editorRef.current.setValue(formatted);
  }

  return <Container>
    {editorRef.current && <BundleButton onClick={onBundle}>Run</BundleButton>}
    {editorRef.current && <FormatButton onClick={onFormatClick}>Format</FormatButton>}
    <Editor
      value={value}
      onChange={(e) => e && onChange(e)}
      onMount={onMount}
      height="40vh"
      defaultLanguage="javascript"
      theme="vs-dark"
      options={{
        wordWrap: "on",
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 15,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
      }}
    />
  </Container>
}

export default CodeEditor
