import { useTypedSelector } from './useTypedSelector';

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map(id => data[id]);

    const renderFunction = `
    import _React from "react";
    import { createRoot } from "react-dom/client";

    var render = (value) => {
      let render;
      const root = document.getElementById("root");
      if (typeof value === 'object') {
        if (value.props) {
          render = createRoot(root).render(value);
        } else {
          render = JSON.stringify(value);
        }
      } else {
        render = value
      }
      root.innerHTML = render;
    }
  `;
    const renderNoFunction = `
    var render = () => {};
  `;

    const codes = [];
    for (let currentCell of orderedCells) {
      if (currentCell.type === "code") {
        if (currentCell.id === cellId) {
          codes.push(renderFunction);
        } else {
          codes.push(renderNoFunction);
        }

        codes.push(currentCell.content);
      }
      if (currentCell.id === cellId) break;
    }
    return codes.join("\n");
  });
}