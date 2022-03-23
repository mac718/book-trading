import styles from "./RequestsListItem.module.css";
import { Book } from "../components/Books";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";

type RequestsListItemProps = {
  requestedBooks: Book[];
  offeredBooks: Book[];
};

type BookBoxProps = {
  book: Book;
  from: boolean;
};

const BookBox = ({ book, from }: BookBoxProps) => {
  const fromUser = from ? `from ${book.email}` : "";
  return (
    <div className={styles["book-box"]}>
      <div>
        {book.title} {fromUser}
      </div>
      <div>{book.author}</div>
    </div>
  );
};

const RequestsListItem = ({
  requestedBooks,
  offeredBooks,
}: RequestsListItemProps) => {
  const authCtx = useContext(AuthContext);

  const requestedBoxes = requestedBooks.map((book) => {
    return <BookBox book={book} from={true} />;
  });

  const offeredBoxes = offeredBooks.map((book) => {
    return <BookBox book={book} from={false} />;
  });

  return (
    <div className={styles.item}>
      <div className={styles["inner-item-box"]}>
        <div className={styles["caption-and-boxes"]}>
          <span className={styles.caption}>
            <Link to="/profile">{authCtx.currentUser?.email}</Link> wants to
            give:
          </span>
          <div className={styles["book-box-container"]}>{offeredBoxes}</div>
        </div>
        <div className={styles["caption-and-boxes"]}>
          <span className={styles.caption}>And wants to take:</span>
          <div className={styles["book-box-container"]}>{requestedBoxes}</div>
        </div>
      </div>
    </div>
  );
};

export default RequestsListItem;
