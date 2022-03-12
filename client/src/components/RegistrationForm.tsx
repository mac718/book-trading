import { FormEventHandler, useRef } from "react";
import styles from "./RegistrationForm.module.css";
import Button from "./UI/Button";

const RegistrationForm = () => {
  let nameRef = useRef<HTMLInputElement>(null);
  let locationRef = useRef<HTMLInputElement>(null);
  let passwordRef = useRef<HTMLInputElement>(null);

  const registerHandler = (e: any) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/users", {
      method: "POST",
      body: JSON.stringify({
        name: nameRef.current,
        location: locationRef.current,
        password: passwordRef.current,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <form className={styles.form} onSubmit={registerHandler}>
      <h2>Sign Up!</h2>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" ref={nameRef} />
      <label htmlFor="location">Location</label>
      <input type="text" id="location" ref={locationRef} />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" ref={passwordRef} />
      <Button>Submit</Button>
    </form>
  );
};

export default RegistrationForm;
