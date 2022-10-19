import { styled } from '@mui/material';
import CellListItem from './CellListItem';
import AddCell from '../add-cell/AddCell';
import CellActions from '../cell-actions/CellActions';
import { useTypedSelector } from 'hooks/useTypedSelector';

const CellListWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: "16px",
  rowGap: "26px",
})

const CellWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  rowGap: "6px",
})

const CellList = () => {
  const cells = useTypedSelector(state => state.cells.order.map(order => state.cells.data[order]));

  const renderedCells = cells.map(cell => <CellWrapper key={cell.id}>
    <CellActions id={cell.id} />
    <CellListItem cell={cell} />
  </CellWrapper>)

  return <CellListWrapper>
    {renderedCells}
    <AddCell beforeCellId="" />
  </CellListWrapper>
}

export default CellList
