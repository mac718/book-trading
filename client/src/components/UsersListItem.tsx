import styles from "./UsersListItem.module.css";
import { Link } from "react-router-dom";

type UsersListItemProps = {
  name: string;
  email: string;
  location: string;
  bookCount: number | undefined;
};

const UsersListItem = ({
  name,
  email,
  location,
  bookCount,
}: UsersListItemProps) => {
  return (
    <div className={styles.item}>
      <Link to={`/profile/${email}`}>{email}</Link>
      <div>location: {location}</div>
      <div className={styles["book-count"]}>books: {bookCount}</div>
    </div>
  );
};

export default UsersListItem;
