import { ChangeEvent, useState, FormEvent, useContext } from "react";
import AuthContext from "../store/auth-context";
import styles from "./RegistrationForm.module.css";
import Button from "./UI/Button";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authCtx = useContext(AuthContext);

  const setNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const setEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const setLocationHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const setPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const registerHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/users", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        location,
        password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        authCtx.logIn(json.token, json.newUser);
      })
      .catch((err) => {
        console.log(err);
      });
    setName("");
    setEmail("");
    setLocation("");
    setPassword("");
  };

  return (
    <form className={styles.form} onSubmit={registerHandler}>
      <h2 className={styles.heading}>Sign Up!</h2>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        className={styles.input}
        id="name"
        onChange={setNameHandler}
        value={name}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        className={styles.input}
        id="email"
        onChange={setEmailHandler}
        value={email}
      />
      <label htmlFor="location">Location</label>
      <input
        type="text"
        className={styles.input}
        id="location"
        onChange={setLocationHandler}
        value={location}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        className={styles.input}
        id="password"
        onChange={setPasswordHandler}
        value={password}
      />
      <Button>Register!</Button>
    </form>
  );
};

export default RegistrationForm;
