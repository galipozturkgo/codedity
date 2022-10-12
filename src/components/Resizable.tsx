import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps, ResizeCallbackData } from "react-resizable";

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

  const [width, setWidth] = useState<number>(window.innerWidth * 0.5 + 7);
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    let timer: NodeJS.Timer;

    const listener = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setInnerWidth(window.innerWidth);
        setInnerHeight(window.innerHeight);
      }, 100);
    }

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    }
  }, [width]);


  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.8, Infinity],
      height: Infinity,
      width: width,
      resizeHandles: ['e'],
      onResizeStop: (_, data: ResizeCallbackData) => setWidth(data.size.width),
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 100],
      maxConstraints: [Infinity, innerHeight * 0.9],
      height: innerHeight * 0.4,
      width: Infinity,
      resizeHandles: ['s'],
    };
  }

  return <StyledResizableBox {...resizableProps}>
    {children}
  </StyledResizableBox>
}

export default Resizable
