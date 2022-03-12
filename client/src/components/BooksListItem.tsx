import styles from "./BooksListItem.module.css";

type BooksListItemProps = {
  title: string;
  author?: string;
  user: string;
  location?: string;
};

const BooksListItem = ({
  title,
  author,
  user,
  location,
}: BooksListItemProps) => {
  return (
    <div className={styles.item}>
      <input type="checkbox" className={styles.checkbox} />
      <div className={styles["book-info"]}>
        <div className={styles["book-title"]}>{title}</div>
        <div className={styles.author}>by {author}</div>
        <div>
          from {user} in {location}
        </div>
      </div>
    </div>
  );
};

export default BooksListItem;
