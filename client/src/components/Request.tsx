import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Book } from "./Books";
import styles from "./Request.module.css";
import BooksListItem from "./BooksListItem";
import Heading from "./UI/Heading";
interface LocationState {
  books: string[];
}
const Request = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const location = useLocation();
  const state = location.state as LocationState;

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

  const bookAvailableForTrade: React.ReactNode[] = [];

  if (books.length > 0) {
    books.forEach((book) => {
      bookAvailableForTrade.push(
        <BooksListItem
          id={book.id}
          title={book.title}
          author={book.author}
          location={book.location}
          user={book.user}
          onBookSelection={(id, action) => {}}
        />
      );
    });
  }

  return (
    <div className={styles["request-container"]}>
      <Heading text="Create Request" subText="for trade" />
      <div className={styles.request}>
        <div>{bookAvailableForTrade}</div>
      </div>
    </div>
  );
};
export default Request;
