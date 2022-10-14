import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import authService from "../../services/auth.service";

import logo from "../../assets/logo.svg";

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
      <nav className={styles.contents} role="navigation">
        <div className={styles.logoContainer}>
          <img
            src={undefined}
            alt={logo}
            className={styles.logoImage}
            onClick={() => {
              navigate("/");
            }}
          />
        </div>

        {/* <div className="px-4 cursor-pointer nvbar:hidden" onClick={toggle}>
          <FontAwesomeIcon icon={faBars} className="w-8 h-8 text-lightblack" />
        </div> */}
        <div className="pr-8 nvbar:block hidden">
          <Link to="/" className="p-4 text-lightblack hover:text-lightblack">
            Strona Główna
          </Link>
          <Link
            to="/scoreboard"
            className="p-4 text-lightblack hover:text-lightblack"
          >
            Ranking
          </Link>

          {currentUser ? (
            <>
              {authorized && (
                <Link
                  to="/admin"
                  className="p-4 text-lightblack hover:text-lightblack"
                >
                  Panel Admina
                </Link>
              )}
              <Link
                to="/posty"
                className="p-4 text-lightblack hover:text-lightblack"
              >
                Moje Posty
              </Link>
              <Link
                onClick={logOut}
                to="/"
                className="px-3 py-2 ml-2 bg-lightgreen rounded-full text-lightblack hover:text-lightblack"
              >
                Wyloguj
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="px-3 py-2 ml-2 bg-lightgreen rounded-full text-lightblack hover:text-lightblack"
            >
              Logowanie
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
