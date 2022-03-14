import React, { useState, FormEvent, ChangeEvent, useContext } from "react";
import AuthContext from "../store/auth-context";
import styles from "./AddBookForm.module.css";
import Books from "./Books";
import Button from "./UI/Button";

const AddBookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const authCtx = useContext(AuthContext);

  const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const setAuthorHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };
  const setDescriptionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    console.log(authCtx);
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/books", {
      method: "POST",
      body: JSON.stringify({ title, author, description }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.token}`,
      },
    }).catch((err) => {
      console.log(err);
    });
  };
  return (
    <>
      <form className={styles.form} onSubmit={submitHandler}>
        <h1>
          Add A Book{" "}
          <span className={styles.name}>for {authCtx.currentUser?.name}</span>
        </h1>
        <div>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            type="text"
            id="title"
            className={styles.input}
            onChange={setTitleHandler}
          />
        </div>

        <div>
          <label htmlFor="Author" className={styles.label}>
            Author
          </label>
          <input
            type="text"
            id="Author"
            className={styles.input}
            onChange={setAuthorHandler}
          />
        </div>

        <div>
          <label htmlFor="Description" className={styles.label}>
            Description
          </label>
          <input
            type="text"
            id="Description"
            className={styles.input}
            onChange={setDescriptionHandler}
          />
        </div>
        <Button>Add Book</Button>
      </form>
      <Books all={false} />
    </>
  );
};

export default AddBookForm;
