import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";
import styles from "./Books.module.css";
import BooksListItem from "./BooksListItem";
import Button from "./UI/Button";
import Heading from "./UI/Heading";

export type Book = {
  id: string;
  title: string;
  author?: string;
  user: string;
  location?: string;
  userId: string;
};

type BooksProps = {
  all: boolean;
};

const Books = ({ all }: BooksProps) => {
  const [booksList, setBooksList] = useState<Book[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  let url: string;

  const authCtx = useContext(AuthContext);
  const currentUserEmail = authCtx.currentUser?.email;

  if (all) {
    url = "http://localhost:3001/api/v1/books/all";
  } else {
    url = `http://localhost:3001/api/v1/books/currentUser`;
  }

  useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
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

  const onBookSelection = (id: string, action: string) => {
    if (action === "add") {
      setSelectedBooks((prev) => [...prev, id]);
    } else if (action === "remove") {
      let index = selectedBooks.indexOf(id);
      let selectedBooksCopy = selectedBooks.slice(0);
      selectedBooksCopy.splice(index, 1);
      setSelectedBooks(selectedBooksCopy);
    }
  };
  console.log(selectedBooks);

  const allBooks = booksList.map((book, idx) => {
    return (
      <BooksListItem
        id={book.id}
        key={idx}
        title={book.title}
        author={book.author}
        user={book.user}
        location={book.location}
        onBookSelection={onBookSelection}
      />
    );
  });
  return (
    <div className={styles.main}>
      {/* <div className={styles.heading}>
        <div>
          Books <span className={styles.subheading}>available for trade</span>
        </div>
      </div> */}
      <Heading text="Books" subText="available for trade" />
      {allBooks}
      <div>
        {authCtx.isLoggedIn && (
          <Link to="/add-book">
            <Button>Add Book</Button>
          </Link>
        )}
        {authCtx.isLoggedIn && (
          <Link to="/new-request" state={{ books: selectedBooks }}>
            <Button>Create New Request</Button>
          </Link>
        )}
        {!authCtx.isLoggedIn && (
          <Link to="/login">
            <Button>Login to add a Book</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Books;
