import { styled } from "@mui/material";
import AddCell from '../add-cell/AddCell';
import Button from 'components/shared/Button';
import ClearIcon from '@mui/icons-material/Clear';
import { useCellsActions } from '../state/cellsSlice';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Container = styled("div")({
  display: "flex",
  justifyContent: "space-between",
})

const ActionButtonsWrapper = styled("div")({
  display: "flex",
  "& button": {
    opacity: 0.75,
  },
  ":hover": {
    "& button": {
      opacity: 1,
      transition: "ease-in",
      transitionDuration: "100ms",
    }
  }
})

interface CellActionsProps {
  id: string;
}

const CellActions: React.FC<CellActionsProps> = ({ id }) => {
  const { moveCell, deleteCell } = useCellsActions();

  return <Container>
    <AddCell beforeCellId={id} />
    <ActionButtonsWrapper>
      <Button
        color="warning"
        icon={<KeyboardArrowUpIcon />}
        stopPropagation
        onClick={() => moveCell({ id, direction: "up" })}
      />
      <Button
        color="warning"
        icon={<KeyboardArrowDownIcon />}
        stopPropagation
        onClick={() => moveCell({ id, direction: "down" })}
      />
      <Button
        color="error"
        icon={<ClearIcon />}
        stopPropagation
        onClick={() => deleteCell({ id })}
      />
    </ActionButtonsWrapper>
  </Container>
}

export default CellActions
