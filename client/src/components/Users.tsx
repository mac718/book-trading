import { useState, useEffect } from "react";
import styles from "./Users.module.css";
import UsersListItem from "./UsersListItem";

export type User = {
  id: string;
  name: string;
  email: string;
  location: string;
  bookCount?: number;
  incomingRequests?: number;
};

const Users = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/users/all")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setAllUsers(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const usersListItems = allUsers.map((user) => {
    return (
      <UsersListItem
        key={user.id}
        name={user.name}
        email={user.email}
        location={user.location}
        bookCount={user.bookCount}
        reqCount={user.incomingRequests}
      />
    );
  });

  const usersArr = allUsers.map((user) => user.name);
  return (
    <div className={styles["users-container"]}>
      <h1>Users</h1>
      <div className={styles["users-list"]}>{usersListItems}</div>
    </div>
  );
};

export default Users;
