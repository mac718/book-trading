import styles from "./UsersListItem.module.css";
import { Link } from "react-router-dom";

type UsersListItemProps = {
  name: string;
  email: string;
  location: string;
  bookCount: number | undefined;
  reqCount?: number;
};

const UsersListItem = ({
  name,
  email,
  location,
  bookCount,
  reqCount,
}: UsersListItemProps) => {
  console.log("Reaq", reqCount);
  return (
    <div className={styles.item}>
      <Link to={`/profile/${email}`}>{email}</Link>
      <div>location: {location}</div>
      <div className={styles["book-count"]}>books: {bookCount}</div>
      <div className={styles["request-count"]}>
        incoming requests: {reqCount}
      </div>
    </div>
  );
};

export default UsersListItem;
