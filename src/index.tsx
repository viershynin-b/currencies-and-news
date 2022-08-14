import ReactDOM from "react-dom/client";

import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store";

import "./index.css";

const theme = createTheme({
  palette: {
    warning: {
      main: "#F2BB66",
    },
    success: {
      main: "#3CACAE",
    },
    error: {
      main: "#E57F84;",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
