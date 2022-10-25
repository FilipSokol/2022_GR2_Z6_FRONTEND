import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import authService from "../../services/auth.service";
import Logo from "../../assets/logo";

const Navbar = ({ toggle }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [authorized, setAuthorized] = useState(false);

  const navigate = useNavigate();

  const AuthVerify = () => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    // if (user) {
    //   const decodedJwt = parseJwt(user.accessToken);
    //   if (decodedJwt.role === "admin") {
    //     setAuthorized(true);
    //   }
    //   if (decodedJwt.exp * 1000 < Date.now()) {
    //     logOut();
    //   }
    // }
  };

  const logOut = () => {
    AuthService.logout();
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    AuthVerify();
  }, [location.pathname]);

  return (
    <div className={styles.container}>
      <nav className={styles.content} role="navigation">
        <div className={styles.logoContainer}>
          <div
            className={styles.logoImage}
            onClick={() => {
              navigate("/");
            }}
          >
            <Logo />
          </div>
        </div>
        <div className={styles.navButtons}>
          <Link to="/" className={styles.navButton}>
            Strona Główna
          </Link>

          <Link to="/student" className={styles.navButton}>
            Panel Studenta
          </Link>
          <Link to="/nauczyciel" className={styles.navButton}>
            Panel Nauczyciela
          </Link>

          <Link onClick={logOut} to="/" className={styles.navButton}>
            Wyloguj
          </Link>

          <Link to="/login" className={styles.navButton}>
            Logowanie
          </Link>

          {/* {currentUser ? (
            <Link onClick={logOut} to="/" className={styles.navButton}>
              Wyloguj
            </Link>
          ) : (
            <Link to="/login" className={styles.navButton}>
              Logowanie
            </Link>
          )} */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
