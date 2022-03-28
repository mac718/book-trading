import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { User } from "../components/Users";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const [user, setUser] = useState<User>();
  const { email } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/api/v1/users/user?user=${email}`)
      .then((res) => res.json())
      .then((json) => setUser(json))
      .catch((err) => console.log(err));
  }, []);

  if (user) {
    return (
      <div className={styles.profile}>
        <h1>
          {user.name}'s <span className={styles["profile-text"]}>profile</span>
        </h1>
        <div>
          <span className={styles.attribute}>Full Name</span> {user.name}
        </div>
        <div>
          <span className={styles.attribute}>Email</span> {user.email}
        </div>
        <div>
          <span className={styles.attribute}>Location</span> {user.location}
        </div>
        <div className={styles["button-div"]}>
          <button className={styles.button}>
            <Link to={`/books/user/${user.id}`}>{user.email}'s Books</Link>
          </button>
          <button className={styles.button}>
            <Link to="/edit-profile">Edit Profile</Link>
          </button>
        </div>
      </div>
    );
  } else {
    return <div>Could not find User Profile</div>;
  }
};

export default UserProfile;
