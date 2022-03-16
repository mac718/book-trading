import { ChangeEvent, useState } from "react";
import styles from "./BooksListItem.module.css";

export type BooksListItemProps = {
  id: string;
  title: string;
  author?: string;
  user: string;
  location?: string;
  onBookSelection: (id: string, action: string) => void;
};

const BooksListItem = ({
  id,
  title,
  author,
  user,
  location,
  onBookSelection,
}: BooksListItemProps) => {
  const [selected, setSelected] = useState(false);
  const checkBoxChangeHandler = () => {
    if (selected) {
      setSelected(false);
      onBookSelection(id, "remove");
    } else {
      setSelected(true);
      onBookSelection(id, "add");
    }
    console.log(selected);
  };
  return (
    <div className={styles.item}>
      <input
        type="checkbox"
        className={styles.checkbox}
        onChange={checkBoxChangeHandler}
      />
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
