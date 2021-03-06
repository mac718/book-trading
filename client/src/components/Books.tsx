import { ReactNode, useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import AuthContext from "../store/auth-context";
import styles from "./Books.module.css";
import BooksListItem from "./BooksListItem";
import Heading from "./UI/Heading";

export type Book = {
  id: string;
  title: string;
  author?: string;
  user: string;
  email: string;
  location?: string;
  userId: string;
};

interface LocationState {
  checkedBooks: string[];
  take?: boolean;
}

const Books = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const [booksList, setBooksList] = useState<Book[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const { id } = useParams();

  const authCtx = useContext(AuthContext);

  let url: string;

  if (location.pathname === "/add-books" || (state && !state.take)) {
    url = `http://localhost:3001/api/v1/books/user?id=${
      authCtx.currentUser!.id
    }`;
  } else if (!id) {
    url = "http://localhost:3001/api/v1/books/all";
  } else {
    url = `http://localhost:3001/api/v1/books/user?id=${id}`;
  }

  useEffect(() => {
    fetch(url)
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

  const allBooks = booksList.map((book, idx) => {
    if (state && state.checkedBooks.includes(book.id)) {
      return (
        <BooksListItem
          id={book.id}
          key={idx}
          title={book.title}
          author={book.author}
          user={book.user}
          location={book.location}
          onBookSelection={onBookSelection}
          checked={true}
        />
      );
    }
    return (
      <BooksListItem
        id={book.id}
        key={idx}
        title={book.title}
        author={book.author}
        user={book.user}
        location={book.location}
        onBookSelection={onBookSelection}
        checked={false}
      />
    );
  });

  let booksState: {
    requestedBooks?: string[] | null;
    offeredBooks?: string[] | null;
  };

  if (authCtx.currentUser && url.includes(authCtx.currentUser!.id)) {
    booksState = { offeredBooks: selectedBooks };
  } else {
    booksState = { requestedBooks: selectedBooks };
  }
  return (
    <div className={styles.main}>
      <Heading text="Books" subText="available for trade" />
      {allBooks}
      <div className={styles.buttons}>
        {authCtx.isLoggedIn && !location.state && (
          <Link to="/add-book">
            <button className={styles.button}>Add Book</button>
          </Link>
        )}
        {authCtx.isLoggedIn && !location.state && (
          <Link to="/new-request" state={booksState}>
            <button className={styles.button}>Create New Request</button>
          </Link>
        )}
        {authCtx.isLoggedIn && location.state && (
          <Link to="/new-request" state={booksState}>
            <button className={styles.button}>Continue</button>
          </Link>
        )}
        {!authCtx.isLoggedIn && (
          <Link to="/login">
            <button className={styles.button}>Login to add a Book</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Books;
