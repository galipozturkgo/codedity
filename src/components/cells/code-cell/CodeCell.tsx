import { useEffect } from "react";
import CodeEditor from "./CodeEditor";
import { styled } from "@mui/material";
import CodePreview from "./CodePreview";
import Loading from 'components/shared/Loading';
import Resizable from 'components/shared/Resizable';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { Cell, useCellsActions } from '../state/cellsSlice';
import { useBundleActions } from 'bundle/state/bundlesSlice';
import { useCumulativeCode } from 'hooks/useCumulativeCode';

const Container = styled("div")({
  height: "calc(100% - 10px)",
  display: "flex",
  flexDirection: "row",
});

const Preview = styled("div")({
  height: "100%",
  flexGrow: 1,
  backgroundColor: "white",
})

const LoadingWrapper = styled("div")({
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "@keyframes pulsate": {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    }
  },
  animation: "pulsate 0.5s",
  "& svg": {
    color: "#232a30"
  }
})

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell } = useCellsActions();
  const { createBundle } = useBundleActions();
  const cumulativeCodes = useCumulativeCode(cell.id);
  const bundle = useTypedSelector(state => state.bundles[cell.id]);

  useEffect(() => {
    if (!bundle) {
      createBundle({ cellId: cell.id, rawCode: cumulativeCodes });
      return;
    }

    const timer = setTimeout(() => {
      createBundle({ cellId: cell.id, rawCode: cumulativeCodes });
    }, 750);
    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cell.content, createBundle]);

  return <Resizable direction="vertical">
    <Container>
      <Resizable direction="horizontal">
        <CodeEditor
          value={cell.content}
          onChange={(value) => updateCell({ id: cell.id, content: value })}
        />
      </Resizable>
      <Preview>
        {!bundle || bundle.loading ? <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
          : <CodePreview
            code={bundle.output.code}
            error={bundle.output.error}
          />}
      </Preview>
    </Container>
  </Resizable>;
}

export default CodeCell
