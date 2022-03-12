import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.title}>Book Exchange</div>
        <Link to="/">
          <div className={styles["nav-link"]}>Books</div>
        </Link>
        <div className={styles["nav-link"]}>Requests</div>
        <div className={styles["nav-link"]}>Trades</div>

        <Link to="/users">
          <div className={styles["nav-link"]}>Users</div>
        </Link>
      </div>
      <div className={styles.right}>Login</div>
    </div>
  );
};

export default NavBar;
