import React from 'react'
import { styled } from "@mui/material";
import Button from 'components/shared/Button';
import AddIcon from '@mui/icons-material/Add';
import { useCellsActions } from '../state/cellsSlice';


const Container = styled("div")({
  display: "flex",
})

interface AddCellProps {
  beforeCellId: string;
}

const AddCell: React.FC<AddCellProps> = ({ beforeCellId }) => {
  const { insertCell } = useCellsActions();

  return <Container>
    <Button
      color="primary"
      icon={<AddIcon />}
      stopPropagation
      onClick={() => insertCell({ id: beforeCellId, type: "text" })}
    >
      Text
    </Button>
    <Button
      color="secondary"
      icon={<AddIcon />}
      stopPropagation
      onClick={() => insertCell({ id: beforeCellId, type: "code" })}
    >
      Code
    </Button>
  </Container>;
}

export default AddCell
