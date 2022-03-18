import styles from "./RequestBook.module.css";

type RequestBookProps = {
  id: string;
  title: string;
  author?: string;
  user: string;
  location?: string;
  color: string;
};

const RequestBook = ({
  id,
  title,
  author,
  user,
  location,
  color,
}: RequestBookProps) => {
  return (
    <div className={`${styles.item} ${styles[`${color}`]}`}>
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

export default RequestBook;
