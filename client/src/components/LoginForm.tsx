import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const setEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const setPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        authCtx.logIn(json.token, json.user);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form className={styles["login-form"]} onSubmit={submitHandler}>
      <h1 className={styles.heading}>Log In</h1>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        className={styles.input}
        onChange={setEmailHandler}
      />

      <label htmlFor="password ">Password</label>
      <input
        type="password"
        id="password"
        className={styles.input}
        onChange={setPasswordHandler}
      />
      <button>Log In</button>
    </form>
  );
};

export default LoginForm;
