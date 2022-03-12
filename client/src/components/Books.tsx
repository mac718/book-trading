import { useEffect, useState } from "react";
import styles from "./Books.module.css";
import BooksListItem from "./BooksListItem";

type Book = {
  title: string;
  author?: string;
  user: string;
  location?: string;
  userId: string;
};

const Books = () => {
  const [booksList, setBooksList] = useState<Book[]>([]);
  useEffect(() => {
    fetch("http://localhost:3001/api/v1/books/all")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setBooksList(json);
        console.log(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const allBooks = booksList.map((book, idx) => {
    return (
      <BooksListItem
        key={idx}
        title={book.title}
        author={book.author}
        user={book.user}
        location={book.location}
      />
    );
  });
  return (
    <div className={styles.main}>
      <div className={styles.heading}>
        <div>
          Books <span className={styles.subheading}>available for trade</span>
        </div>
      </div>
      {allBooks}
    </div>
  );
};

export default Books;
