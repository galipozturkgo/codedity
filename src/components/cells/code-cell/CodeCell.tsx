import CodeEditor from "./CodeEditor";
import { styled } from "@mui/material";
import CodePreview from "./CodePreview";
import { useState, useEffect } from "react";
import Resizable from 'components/shared/Resizable';
import bundler, { BundlerOutputProps } from "bundler";
import { Cell, useCellsActions } from '../state/cellsSlice';

const Container = styled("div")(({ theme }) => ({
  height: "calc(100% - 10px)",
  display: "flex",
  flexDirection: "row",

}));

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell } = useCellsActions();

  const [output, setOutput] = useState<BundlerOutputProps>({ code: "", error: "" });

  useEffect(() => {
    const timer = setTimeout(async () => setOutput(await bundler(cell.content)), 500);
    return () => clearTimeout(timer);
  }, [cell.content]);

  return <Resizable direction="vertical">
    <Container>
      <Resizable direction="horizontal">
        <CodeEditor
          value={cell.content}
          onChange={(value) => updateCell({ id: cell.id, content: value })}
        />
      </Resizable>
      <CodePreview {...output} />
    </Container>
  </Resizable>;
}

export default CodeCell
