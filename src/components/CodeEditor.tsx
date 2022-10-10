import { useRef } from "react";
import prettier from "prettier";
import monaco from "monaco-editor";
import Editor from "@monaco-editor/react";
import parser from "prettier/parser-babel";

interface CodeEditorProps {
  value: string,
  onChange: (value: string) => void,
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
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

  return <div>
    <button onClick={onFormatClick}>Format</button>
    <Editor
      value={value}
      onChange={(e) => e && onChange(e)}
      onMount={onMount}
      height="30vh"
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
  </div>
}

export default CodeEditor
