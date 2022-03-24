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
import CreateRequest from "./components/CreateRequest";
import Requests from "./components/Requests";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/users" element={<Users />} />
          <Route path="/register" element={<RegistrationForm />} />
          {authCtx.isLoggedIn && (
            <Route path="/add-book" element={<AddBookForm />} />
          )}
          <Route path="/login" element={<LoginForm />} />

          <Route path="/profile">
            <Route path=":email" element={<UserProfile />} />
          </Route>

          {authCtx.isLoggedIn && (
            <Route path="/new-request" element={<CreateRequest />} />
          )}

          <Route path="/books" element={<Books />} />
          <Route path="books/user">
            <Route path=":id" element={<Books />} />
          </Route>
          <Route path="/requests" element={<Requests />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
