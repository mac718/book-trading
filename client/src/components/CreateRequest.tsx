import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Book } from "./Books";
import styles from "./CreateRequest.module.css";
import Heading from "./UI/Heading";
import RequestBook from "./RequestBook";
import AuthContext from "../store/auth-context";

interface LocationState {
  requestedBooks: string[];
  offeredBooks: string[];
}

const CreateRequest = () => {
  const offeredLocal = localStorage.getItem("offeredBooks")
    ? JSON.parse(localStorage.getItem("offeredBooks")!)
    : null;
  const requestedLocal = localStorage.getItem("requestedBooks")
    ? JSON.parse(localStorage.getItem("requestedBooks")!)
    : null;

  const [fetchedOfferedBooks, setFetchedOfferedBooks] =
    useState<Book[]>(offeredLocal);
  const [fetchedRequestedBooks, setFetchedRequestedBooks] =
    useState<Book[]>(requestedLocal);
  const [requested, setRequested] = useState<string[]>([]);
  const [offered, setOffered] = useState<string[]>([]);
  const location = useLocation();
  const state = location.state as LocationState;
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const requestedBookIds =
    requested.length > 0 ? requested : state.requestedBooks;

  const requestQueryString = requestedBookIds
    ? requestedBookIds.join("&id=")
    : null;

  const offeredBookIds = offered.length > 0 ? offered : state.offeredBooks;
  const offerQueryString = offeredBookIds ? offeredBookIds.join("&id=") : null;

  useEffect(() => {
    const getBooksForRequest = async () => {
      if (offeredBookIds && offeredBookIds.length > 0) {
        fetch(
          `http://localhost:3001/api/v1/books/get-multiple?id=${offerQueryString}`
        )
          .then((res) => res.json())
          .then((json) => {
            setOffered(offeredBookIds);
            localStorage.setItem(
              "offeredBookIds",
              JSON.stringify(offeredBookIds)
            );
            setFetchedOfferedBooks(json);
            localStorage.setItem("offeredBooks", JSON.stringify(json));
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (requestedBookIds && requestedBookIds.length > 0) {
        fetch(
          `http://localhost:3001/api/v1/books/get-multiple?id=${requestQueryString}`
        )
          .then((res) => res.json())
          .then((json) => {
            setRequested(requestedBookIds);
            localStorage.setItem(
              "requestedBookIds",
              JSON.stringify(requestedBookIds)
            );

            setFetchedRequestedBooks(json);
            localStorage.setItem("requestedBooks", JSON.stringify(json));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    getBooksForRequest();
  }, [requestedBookIds, offeredBookIds]);

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
    fetch("http://localhost:3001/api/v1/requests", {
      method: "POST",
      body: JSON.stringify({
        requestedBooks: localStorage.getItem("requestedBookIds"),
        offeredBooks: localStorage.getItem("offeredBookIds"),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then(() => {
        localStorage.removeItem("requestedBooks");
        localStorage.removeItem("offeredBooks");
        setRequested([]);
        setOffered([]);
        window.history.replaceState({ offeredBooks: [], requestBooks: [] }, "");

        navigate("/requests");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              <div className={styles["take-message"]}>And wants to take:</div>
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
      <button
        onClick={submitRequestHandler}
        className={styles["submit-button"]}
      >
        Submit Request
      </button>
    </>
  );
};
export default CreateRequest;
