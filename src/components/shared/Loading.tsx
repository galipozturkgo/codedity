import { CircularProgress, styled } from "@mui/material";

const StyledCircularProgress = styled(CircularProgress)({
  color: "#fff"
})

const Loading = () => {
  return <StyledCircularProgress />
}

export default Loading
