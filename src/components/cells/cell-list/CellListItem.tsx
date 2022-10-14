import React from "react"
import { Cell } from "../state/cellsSlice";
import CodeCell from "../code-cell/CodeCell";
import TextCell from "../text-cell/TextCell";

interface CellListItemProps {
  cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  const CurrentCell = cell.type === "code" ? CodeCell : TextCell;

  return <CurrentCell cell={cell} />;
}

export default CellListItem
