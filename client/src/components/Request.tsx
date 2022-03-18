import { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Book } from "./Books";
import styles from "./Request.module.css";
import Heading from "./UI/Heading";
import RequestBoook from "./RequestBook";
import AuthContext from "../store/auth-context";

interface LocationState {
  requestedBooks: string[];
  offeredBooks: string[];
}
const Request = () => {
  const offeredLocal = localStorage.getItem("offeredBooks")
    ? JSON.parse(localStorage.getItem("offeredBooks")!)
    : null;
  const requestedLocal = localStorage.getItem("offeredBooks")
    ? JSON.parse(localStorage.getItem("requestedBooks")!)
    : null;

  const [books, setBooks] = useState<Book[]>([]);
  const [fetchedOfferedBooks, setFetchedOfferedBooks] =
    useState<Book[]>(offeredLocal);
  const [fetchedRequestedBooks, setFetchedRequestedBooks] =
    useState<Book[]>(requestedLocal);
  const [requested, setRequested] = useState<string[]>([]);
  const [offered, setOffered] = useState<string[]>([]);
  const location = useLocation();
  const state = location.state as LocationState;
  const authCtx = useContext(AuthContext);

  // const requestedBookIds = state.requestedBooks;
  // const offeredBookIds = state.offeredBooks;

  // const requestedQueryString = requestedBookIds.join("&id=");
  // const offeredQueryString = offeredBookIds.join("&id=");

  const requestBookIds = state.requestedBooks;
  const requestQueryString = requestBookIds
    ? requestBookIds.join("&id=")
    : null;
  const offerBookIds = state.offeredBooks;
  const offerQueryString = offerBookIds ? offerBookIds.join("&id=") : null;

  useEffect(() => {
    const getBooksForRequest = async () => {
      if (state.offeredBooks) {
        fetch(
          `http://localhost:3001/api/v1/books/get-multiple?id=${offerQueryString}`
        )
          .then((res) => res.json())
          .then((json) => {
            setOffered(offerBookIds);
            setFetchedOfferedBooks(json);
            localStorage.setItem("offeredBooks", JSON.stringify(json));
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        fetch(
          `http://localhost:3001/api/v1/books/get-multiple?id=${requestQueryString}`
        )
          .then((res) => res.json())
          .then((json) => {
            setRequested(requestBookIds);
            setFetchedRequestedBooks(json);
            localStorage.setItem("requestedBooks", JSON.stringify(json));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    getBooksForRequest();
  }, []);

  const requestedBooks: React.ReactNode[] = [];
  const offeredBooks: React.ReactNode[] = [];

  if (fetchedRequestedBooks) {
    fetchedRequestedBooks.forEach((book) => {
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

  if (fetchedOfferedBooks) {
    fetchedOfferedBooks.forEach((book) => {
      offeredBooks.push(
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

  console.log("offered", offeredBooks);
  console.log("reqested", requestedBooks);
  return (
    <div className={styles["request-container"]}>
      <Heading text="Create Request" subText="for trade" />
      <div className={styles.request}>
        <div>
          <div className={styles.requester}>
            <Link to="/profile">{authCtx.currentUser?.email}</Link> wants to
            give:
          </div>
          <div className={styles["add-books"]}>
            {offeredBooks}
            <Link to="/books" state={{ checkedBooks: offered }}>
              <button>Edit Books to Give</button>
            </Link>
          </div>
        </div>
        <div>
          <div>
            <div>And wants to take:</div>
          </div>
          {requestedBooks}

          <div className={styles["add-books"]}>
            <Link to="/" state={{ checkedBooks: requested }}>
              <button>Edit Books to Take</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Request;
