import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";          // ✅ use consistent extension
import "./index.css";

// Global styles & libraries
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";



import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <AuthProvider>
  <App />
</AuthProvider>

    {/* Toast notifications */}
    <ToastContainer
      position="top-right"
      autoClose={2500}
      theme="dark"
    />
  
  </React.StrictMode>
  
);
