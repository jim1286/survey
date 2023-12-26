import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router/Router.tsx";
import isValidProp from "@emotion/is-prop-valid";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyleSheetManager shouldForwardProp={isValidProp}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StyleSheetManager>
  </React.StrictMode>
);
