import { ChangeEvent, useState } from "react";
import styles from "./RegistrationForm.module.css";
import Button from "./UI/Button";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  // let nameRef = useRef<HTMLInputElement>(null);
  // let locationRef = useRef<HTMLInputElement>(null);
  // let passwordRef = useRef<HTMLInputElement>(null);

  const setNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const setLocationHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const setPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const registerHandler = (e: any) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/users", {
      method: "POST",
      body: JSON.stringify({
        name,
        location,
        password,
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
      <input type="text" id="name" onChange={setNameHandler} />
      <label htmlFor="location">Location</label>
      <input type="text" id="location" onChange={setLocationHandler} />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" onChange={setPasswordHandler} />
      <Button>Submit</Button>
    </form>
  );
};

export default RegistrationForm;
