import { CellsState, cellsReducer, actions } from './cellsSlice';

describe('counter reducer', () => {
  const initialState: CellsState = {
    data: {
      "test": {
        id: "test",
        content: "test",
        type: "code",
      }
    },
    loading: false,
    error: null,
    order: ["test"],
  };

  it('should handle updateCell', () => {
    const actual = cellsReducer(initialState, actions.updateCell({ id: "test", content: "updated" }));
    expect(actual.data["test"].content).toEqual("updated");
  });

  it('should handle insertCell', () => {
    const actual = cellsReducer(initialState, actions.insertCell({ id: null, type: "text" }));
    expect(actual.order.length).toEqual(2);
  });

  it('should handle deleteCell', () => {
    const actual = cellsReducer(initialState, actions.deleteCell({ id: "test" }));
    expect(actual.order.length).toEqual(0);
  });
});
