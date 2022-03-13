import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./components/Users";
import NavBar from "./components/NavBar";
import RegistrationForm from "./components/RegistrationForm";
import AddBookForm from "./components/AddBookForm";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/users" element={<Users />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/add-book" element={<AddBookForm />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
