import React from "react"
import { Cell } from "../state/cellsSlice";
import CodeCell from "../code-cell/CodeCell";
import TextCell from "../text-cell/TextCell";

interface CellListItemProps {
  cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;

  if (cell.type === "code") {
    child = <CodeCell cell={cell} />;
  }
  else {
    child = <TextCell />;
  }

  return <div>
    {child}
  </div>
}

export default CellListItem
