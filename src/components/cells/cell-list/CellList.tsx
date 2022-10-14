import CellListItem from './CellListItem';
import { useTypedSelector } from 'state/hooks'

const CellList = () => {
  const cells = useTypedSelector(state => state.cells.order.map(order => state.cells.data[order]));

  const renderedCells = cells.map(cell => <CellListItem key={cell.id} cell={cell} />)

  return <div>{renderedCells}</div>
}

export default CellList
