import { useEffect, useState } from "react";
import User from "./User";

export default function UserStage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => response.json())
      .then((user) => setUser(user))
      .catch((error) => setError(error));
  }, []);

  if (error) return <span>{error.message}</span>;
  return <div>{user ? <User user={user} /> : <span>Loading...</span>}</div>;
}
