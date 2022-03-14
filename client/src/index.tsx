import React, { useContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./components/Users";
import NavBar from "./components/NavBar";
import RegistrationForm from "./components/RegistrationForm";
import AddBookForm from "./components/AddBookForm";
import AuthContext, { AuthContextProvider } from "./store/auth-context";
import LoginForm from "./components/LoginForm";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
