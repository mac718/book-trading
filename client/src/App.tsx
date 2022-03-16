import "./App.css";
import Books from "./components/Books";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import RegistrationForm from "./components/RegistrationForm";
import AddBookForm from "./components/AddBookForm";
import Users from "./components/Users";
import LoginForm from "./components/LoginForm";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import UserProfile from "./components/UserProfile";
import Request from "./components/Request";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Books all={true} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/register" element={<RegistrationForm />} />
          {authCtx.isLoggedIn && (
            <Route path="/add-book" element={<AddBookForm />} />
          )}
          <Route path="/login" element={<LoginForm />} />
          {authCtx.isLoggedIn && (
            <Route path="/profile" element={<UserProfile />} />
          )}
          {authCtx.isLoggedIn && (
            <Route path="/new-request" element={<Request />} />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
