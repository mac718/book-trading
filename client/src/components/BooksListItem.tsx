import { ChangeEvent, useEffect, useState } from "react";
import styles from "./BooksListItem.module.css";

type BooksListItemProps = {
  id: string;
  title: string;
  author?: string;
  user: string;
  location?: string;
  onBookSelection: (id: string, action: string) => void;
  checked: boolean;
};

const BooksListItem = ({
  id,
  title,
  author,
  user,
  location,
  onBookSelection,
  checked,
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

  console.log("Selected", selected);

  useEffect(() => {
    if (checked) {
      checkBoxChangeHandler();
    }
  }, []);

  return (
    <div className={styles.item}>
      <input
        type="checkbox"
        className={styles.checkbox}
        onChange={checkBoxChangeHandler}
        checked={selected}
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
