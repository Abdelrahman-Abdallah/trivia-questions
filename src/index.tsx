import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import { Provider as RenditionProvider } from "rendition";
import Routes from "./routes";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RenditionProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </RenditionProvider>
    </ReduxProvider>
  </React.StrictMode>
);
