import { useEffect, useState } from "react";
import styles from "./Requests.module.css";

const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/requests")
      .then((res) => res.json())
      .then((json) => setRequests(json))
      .catch((err) => console.log(err));
  }, []);
  return <div>{requests}</div>;
};

export default Requests;
