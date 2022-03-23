import styles from "./RequestsListItem.module.css";
import { Book } from "../components/Books";

type RequestsListItemProps = {
  id: string;
  requestedBooks: Book[];
  offeredBooks: Book[];
};

const RequestsListItem = ({
  id,
  requestedBooks,
  offeredBooks,
}: RequestsListItemProps) => {
  return (
    <div className={styles.item}>
      {id}
      {requestedBooks[0].title}
    </div>
  );
};

export default RequestsListItem;
