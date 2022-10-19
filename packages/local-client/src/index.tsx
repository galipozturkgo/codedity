import App from "./App";
import { store } from 'state/store';
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
