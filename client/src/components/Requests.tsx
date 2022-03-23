import { ReactNode, ReactText, useEffect, useState } from "react";
import styles from "./Requests.module.css";
import RequestsListItem from "./RequestsListItem";
import Heading from "./UI/Heading";
import { Book } from "./Books";

type Request = {
  id: string;
  offeredBooks: string;
  requestedBooks: string;
};

const Requests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [requestedBooks, setRequestedBooks] = useState<any>([]);
  const [offeredBooks, setOfferedBooks] = useState<any>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/requests")
      .then((res) => res.json())
      .then((json) => {
        const parseRequests = async () => {
          const requested = await Promise.all(
            json.map(async (req: any) => {
              const requestedBooksQuery = req.requestedBooks
                .split(",")
                .join("&id=");

              let requestedBooks: any = await fetch(
                `http://localhost:3001/api/v1/books/get-multiple?id=${requestedBooksQuery}`
              );

              requestedBooks = await requestedBooks.json();

              return requestedBooks;
            })
          );

          const offered = await Promise.all(
            json.map(async (req: any) => {
              const offeredBooksQuery = req.offeredBooks
                .split(",")
                .join("&id=");

              let offeredBooks: any = await fetch(
                `http://localhost:3001/api/v1/books/get-multiple?id=${offeredBooksQuery}`
              );

              offeredBooks = await offeredBooks.json();
              return offeredBooks;
            })
          );

          return [requested, offered];
        };
        parseRequests().then((res) => {
          console.log("books", res);
          setRequestedBooks(res[0]);
          setOfferedBooks(res[1]);
          setRequests(json);
        });
      })
      .catch((err) => console.log(err));
  }, []);

  let requestCopy = requests.slice(0);

  requestCopy = requestCopy.map((req, i) => {
    return { ...req, requestedBooks: requestedBooks[i] };
  });

  let offerCopy = requests.slice(0);

  offerCopy = offerCopy.map((req, i) => {
    return { ...req, offeredBooks: offeredBooks[i] };
  });

  const requestDivs = requests.map((req, i) => {
    return (
      <RequestsListItem
        requestedBooks={requestCopy[i].requestedBooks}
        offeredBooks={offerCopy[i].offeredBooks}
      />
    );
  });

  return (
    <div className={styles["requests-list"]}>
      <Heading text="All Requests" subText="" />
      <div>{requestDivs}</div>
    </div>
  );
};

export default Requests;
