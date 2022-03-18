import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/auth-context";

const NavBar = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const logOutHnadler = () => {
    authCtx.logOut();
    localStorage.removeItem("offeredBooks");
    localStorage.removeItem("requestedBooks");
    navigate("/", { replace: true });
  };

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
      {!authCtx.isLoggedIn && (
        <div className={styles.right}>
          <Link to="/login">Login </Link>
        </div>
      )}
      {authCtx.isLoggedIn && (
        <div className={styles.right} onClick={logOutHnadler}>
          Logout
        </div>
      )}
    </div>
  );
};

export default NavBar;
