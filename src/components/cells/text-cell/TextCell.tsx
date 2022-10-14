import { styled } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState, useRef } from "react";
import { Cell, useCellsActions } from '../state/cellsSlice';

const MDEditorWrapper = styled("div")({
  "& .w-md-editor": {
    backgroundColor: "#1e1e1e",
  },
  "& .wmde-markdown": {
    backgroundColor: "#1e1e1e",
  },
  "& .w-md-editor-toolbar": {
    backgroundColor: "#1e1e1e",
  },
  "& .w-md-editor-bar": {
    width: "100%",
    height: "10px",
    cursor: "row-resize",
    backgroundColor: "#37414b",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50%",
    backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=')",
    "& svg": {
      display: "none"
    }
  }
});

const MDEditorPreviewWrapper = styled("div")({
  "& .wmde-markdown": {
    padding: "14px 20px",
    backgroundColor: "#1e1e1e",
  }
})

interface TextCellProps {
  cell: Cell;
}

const TextCell: React.FC<TextCellProps> = ({ cell }) => {
  const { updateCell } = useCellsActions();
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        event.target &&
        editorRef.current &&
        editorRef.current.contains(event.target as Node)
      ) return;

      setEditing(false);
    }
    window.addEventListener("click", listener, { capture: true });
    return () => window.removeEventListener("click", listener, { capture: true });
  }, [])

  if (editing) {
    return <MDEditorWrapper ref={editorRef}>
      <MDEditor
        value={cell.content}
        onChange={(value?: string) => updateCell({ id: cell.id, content: value || "" })}
      />
    </MDEditorWrapper>
  }

  return <MDEditorPreviewWrapper onClick={() => setEditing(true)}>
    <MDEditor.Markdown
      source={cell.content || "Click to edit"}
      style={{ whiteSpace: 'pre-wrap' }}
    />
  </MDEditorPreviewWrapper>
}

export default TextCell
