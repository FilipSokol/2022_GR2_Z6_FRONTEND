import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);

  const navigate = useNavigate();

  const Login = (e) => {
    e.preventDefault();
    console.log(e);
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={Login} className={styles.formBox}>
        <div className={styles.formTitle}>Logowanie</div>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Hasło"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.loginButton}>
          Zaloguj
        </button>
      </form>
      <p className={styles.loginMessage}>{loginStatus}</p>
    </div>
  );
}
