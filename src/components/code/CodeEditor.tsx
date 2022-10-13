import { useRef } from "react";
import prettier from "prettier";
import monaco from "monaco-editor";
import { Button, styled } from "@mui/material";
import Editor from "@monaco-editor/react";
import parser from "prettier/parser-babel";

interface CodeEditorProps {
  value: string;
  onMount: () => void;
  onChange: (value: string) => void;
}

const EditorWrapper = styled("div")({
  position: "relative",
  width: "calc(100% - 14px)",
  "& .monaco-editor": {
    paddingLeft: "1px !important",
  },
  ":hover": {
    "& button": {
      opacity: 1,
      transition: "ease-in",
      transitionDuration: "100ms",
    }
  }
})

const ButtonContainer = styled("div")({
  position: "absolute",
  zIndex: 10,
  right: 0,
  display: "flex",
  flexDirection: "row",
  margin: 4,
  columnGap: 4,
})

const FormatButton = styled(Button)({
  height: 30,
  borderRadius: 2,
  width: 100,
  backgroundColor: "#8c1121",
  border: "none",
  color: "white",
  fontWeight: 700,
  textTransform: "unset",
  opacity: 0,
  ":hover": {
    cursor: "pointer",
    background: "#ff0000",
  },
})

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onMount, onChange }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const onEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    onMount();
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

  return <EditorWrapper>
    {editorRef.current && <ButtonContainer>
      <FormatButton onClick={onFormatClick}>Format</FormatButton>
    </ButtonContainer>}
    <Editor
      value={value}
      onChange={(e) => e && onChange(e)}
      onMount={onEditorMount}
      defaultLanguage="javascript"
      loading="Yükleniyor..."
      theme="vs-dark"
      options={{
        wordWrap: "on",
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 14,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
      }}
    />
  </EditorWrapper>
}

export default CodeEditor
