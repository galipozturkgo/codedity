import React from 'react';
import styled from "styled-components";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children: React.ReactNode;
}

const StyledResizableBox = styled(ResizableBox)({
  "& .resize-horizontal": {
    display: "flex",
    flexDirection: "row",
  },
  "& > .react-resizable-handle": {
    display: "block",
    backgroundColor: "#37414b",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50%",
  },
  "& > .react-resizable-handle-s": {
    height: "14px",
    width: "100%",
    cursor: "row-resize",
    backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=')",
  },
  "& > .react-resizable-handle-e": {
    width: "14px",
    minWidth: "14px",
    height: "100%",
    cursor: "col-resize",
    backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==')",
  }
})

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      minConstraints: [window.innerWidth * 0.2, Infinity],
      maxConstraints: [window.innerWidth * 0.8, Infinity],
      height: Infinity,
      width: window.innerWidth * 0.5 + 7,
      resizeHandles: ['e'],
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 100],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      height: 600,
      width: Infinity,
      resizeHandles: ['s'],
    };
  }

  return <StyledResizableBox {...resizableProps}>
    {children}
  </StyledResizableBox>
}

export default Resizable
