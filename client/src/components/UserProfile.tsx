import { useContext } from "react";
import AuthContext from "../store/auth-context";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const authCtx = useContext(AuthContext);

  console.log(authCtx.currentUser);

  return (
    <div className={styles.profile}>
      <h1>
        {authCtx.currentUser?.name}'s{" "}
        <span className={styles["profile-text"]}>profile</span>
      </h1>
      <div>
        <span className={styles.attribute}>Full Name</span>{" "}
        {authCtx.currentUser?.name}
      </div>
      <div>
        <span className={styles.attribute}>Email</span>{" "}
        {authCtx.currentUser?.email}
      </div>
      <div>
        <span className={styles.attribute}>Location</span>{" "}
        {authCtx.currentUser?.location}
      </div>
      <div className={styles["button-div"]}>
        <button className={styles.button}>
          {authCtx.currentUser?.email}'s Books
        </button>
        <button className={styles.button}>Edit Profile</button>
      </div>
    </div>
  );
};

export default UserProfile;
