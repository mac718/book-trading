import styles from "./AddBookForm.module.css";
import Button from "./UI/Button";

const AddBookForm = () => {
  return (
    <form className={styles.form}>
      <h1>Add A Book for</h1>
      <div>
        <label htmlFor="title" className={styles.label}>
          Title
        </label>
        <input type="text" id="title" className={styles.input} />
      </div>

      <div>
        <label htmlFor="Author" className={styles.label}>
          Author
        </label>
        <input type="text" id="Author" className={styles.input} />
      </div>

      <div>
        <label htmlFor="Description" className={styles.label}>
          Description
        </label>
        <input type="text" id="Description" className={styles.input} />
      </div>
      <Button>Add Book</Button>
    </form>
  );
};

export default AddBookForm;
