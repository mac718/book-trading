import styles from "./UsersListItem.module.css";

type UsersListItemProps = {
  name: string;
  location: string;
  bookCount: number | undefined;
};

const UsersListItem = ({ name, location, bookCount }: UsersListItemProps) => {
  return (
    <div className={styles.item}>
      {name}
      <div>location: {location}</div>
      <div className={styles["book-count"]}>books: {bookCount}</div>
    </div>
  );
};

export default UsersListItem;
