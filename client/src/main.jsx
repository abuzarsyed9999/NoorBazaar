import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import store from "./redux/store";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#161b22",
              color: "#e8dcc8",
              border: "1px solid #d4af37",
            },
            success: {
              iconTheme: {
                primary: "#d4af37",
                secondary: "#0d1117",
              },
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
