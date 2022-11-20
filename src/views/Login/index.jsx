import { notification } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import styles from "./Login.module.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);

  const navigate = useNavigate();

  const useAuth = () => {
    const token = authService.getCurrentUser();

    return token && token;
  };

  const isLoggenIn = useAuth();

  useEffect(() => {
    isLoggenIn && navigate("/");
  }, []);

  const Login = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/account/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data.token);
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.token));
          navigate("/");
          notification.success({
            message: "Pomyślnie zalogowano.",
          });
        } else {
          notification.error({
            message: "Błąd logowania.",
          });
        }
      })
      .catch((error) => {
        if (error) {
          setLoginStatus("Nieprawidłowy email lub hasło.");
        }
      });
  };

  return isLoggenIn ? null : (
    <div className={styles.container}>
      <form onSubmit={Login} className={styles.formBox}>
        <div className={styles.formTitle}>Logowanie</div>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
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
