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

  const login = (e) => {
    e.preventDefault();

    axios
      .post("https://student-service-app.azurewebsites.net/api/account/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.token));
          navigate("/");
          window.location.reload();
        } else {
          notification.error({
            message: "Login error.",
          });
        }
      })
      .catch((error) => {
        if (error) {
          setLoginStatus(
            "Incorrect data details or the account is still inactive"
          );
        }
      });
  };

  return isLoggenIn ? null : (
    <div className={styles.container}>
      <form onSubmit={login} className={styles.formBox}>
        <div className={styles.formTitle}>Login</div>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.loginButton}>
          Log in
        </button>
        <p className={styles.bottomMessage}>
          Don't have an account yet?
          <a
            className={styles.bottomLink}
            onClick={() => {
              navigate("/rejestracja");
            }}
          >
            Register
          </a>
          .
        </p>
      </form>
      <p className={styles.loginMessage}>{loginStatus}</p>
    </div>
  );
}
