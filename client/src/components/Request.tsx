import { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Book } from "./Books";
import styles from "./Request.module.css";
import Heading from "./UI/Heading";
import RequestBoook from "./RequestBook";
import AuthContext from "../store/auth-context";

interface LocationState {
  books: string[];
}
const Request = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const location = useLocation();
  const state = location.state as LocationState;
  const authCtx = useContext(AuthContext);

  const bookIds = state.books;

  console.log("bookIds", bookIds);

  const queryString = bookIds.join("&id=");

  useEffect(() => {
    if (bookIds.length > 0) {
      fetch(
        `http://localhost:3001/api/v1/books/get-multiple?id=${queryString}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((json) => {
          setBooks(json);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const requestedBooks: React.ReactNode[] = [];

  if (books.length > 0) {
    books.forEach((book) => {
      requestedBooks.push(
        <RequestBoook
          id={book.id}
          title={book.title}
          author={book.author}
          location={book.location}
          user={book.user}
        />
      );
    });
  }

  return (
    <div className={styles["request-container"]}>
      <Heading text="Create Request" subText="for trade" />
      <div className={styles.request}>
        <div>
          <div className={styles.requester}>
            <Link to="/profile">{authCtx.currentUser?.email}</Link> wants to
            give:
          </div>
        </div>
        <div>
          <div>And wants to take:</div>
          {requestedBooks}
        </div>
      </div>
    </div>
  );
};
export default Request;
