import React, {
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, Link } from "react-router-dom";
import { Book } from "./Books";
import styles from "./Request.module.css";
import Heading from "./UI/Heading";
import RequestBook from "./RequestBook";
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

  console.log("snarf", state);

  const requestBookIds = state.requestedBooks;
  const requestQueryString = requestBookIds
    ? requestBookIds.join("&id=")
    : null;
  const offerBookIds = state.offeredBooks;
  const offerQueryString = offerBookIds ? offerBookIds.join("&id=") : null;

  useEffect(() => {
    const getBooksForRequest = async () => {
      if (state.offeredBooks && state.offeredBooks.length > 0) {
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
      } else if (state.requestedBooks && state.requestedBooks.length > 0) {
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
  }, [requestBookIds, offerBookIds]);

  const requestedBooks: React.ReactNode[] = [];
  const offeredBooks: React.ReactNode[] = [];

  if (fetchedRequestedBooks) {
    fetchedRequestedBooks.forEach((book) => {
      requestedBooks.push(
        <RequestBook
          id={book.id}
          title={book.title}
          author={book.author}
          location={book.location}
          user={book.user}
          color="green"
        />
      );
    });
  }

  if (fetchedOfferedBooks) {
    fetchedOfferedBooks.forEach((book) => {
      offeredBooks.push(
        <RequestBook
          id={book.id}
          title={book.title}
          author={book.author}
          location={book.location}
          user={book.user}
          color="orange"
        />
      );
    });
  }

  const submitRequestHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/requsts", {
      method: "POST",
      body: JSON.stringify({
        requestedBooks: requestBookIds,
        offeredBooks: offerBookIds,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      console.log(err);
    });
  };

  console.log("offered", offeredBooks);
  console.log("reqested", requestedBooks);
  return (
    <>
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
      <button onClick={submitRequestHandler}>Submit Request</button>
    </>
  );
};
export default Request;
