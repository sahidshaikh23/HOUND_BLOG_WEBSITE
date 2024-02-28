import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { store,persistor } from "./Redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </PersistGate>
      </Provider>
    </BrowserRouter>

);


