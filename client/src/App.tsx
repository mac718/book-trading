import "./App.css";
import Books from "./components/Books";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import RegistrationForm from "./components/RegistrationForm";
import AddBookForm from "./components/AddBookForm";
import Users from "./components/Users";
import LoginForm from "./components/LoginForm";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
