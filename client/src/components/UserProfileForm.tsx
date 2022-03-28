import React, {
  FormEventHandler,
  MutableRefObject,
  useContext,
  useRef,
} from "react";
import styles from "./UserProfileForm.module.css";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const UserProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const locationRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    fetch("http://localhost:3001/api/v1/users/user", {
      method: "PATCH",
      body: JSON.stringify({
        name: nameRef.current.value,
        email: emailRef.current.value,
        location: locationRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.token}`,
      },
    }).then(() => {
      navigate(`/profile/${authCtx.currentUser?.email}`);
    });
  };
  return (
    <form className={styles["profile-form"]} onSubmit={submitHandler}>
      <h1>
        {authCtx.currentUser?.name}'s{" "}
        <span className={styles["profile-text"]}>profile</span>
      </h1>
      <div className={styles["label-and-input"]}>
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          className={styles.input}
          defaultValue={authCtx.currentUser?.name}
          ref={nameRef}
        />
      </div>

      <div className={styles["label-and-input"]}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          className={styles.input}
          defaultValue={authCtx.currentUser?.email}
          ref={emailRef}
        />
      </div>

      <div className={styles["label-and-input"]}>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          className={styles.input}
          defaultValue={authCtx.currentUser?.location}
          ref={locationRef}
        />
      </div>
      <button>Save Changes</button>
    </form>
  );
};

export default UserProfileForm;
