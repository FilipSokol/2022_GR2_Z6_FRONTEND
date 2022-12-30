import classNames from "classnames";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import authService from "../../services/auth.service";
import SvgIcon from "../SvgIcon";
import styles from "./LinkMenu.module.scss";

export default function LinkMenu(props) {
  const { icon, link, linkText, logOut } = props;

  const navigate = useNavigate();
  const location = useLocation();

  return logOut ? (
    <a
      onClick={() => {
        authService.logout();
        navigate(link && link);
      }}
    >
      <li
        className={
          location.pathname.startsWith(link) ? styles.background : null
        }
      >
        <SvgIcon icon={icon}></SvgIcon>
        <div
          className={classNames(
            location.pathname.startsWith(link) ? styles.chosenItem : "",
            styles.text
          )}
        >
          {linkText}
        </div>
      </li>
    </a>
  ) : (
    <Link to={link && link}>
      <li
        className={
          location.pathname.startsWith(link) ? styles.background : null
        }
      >
        <SvgIcon icon={icon}></SvgIcon>
        <div
          className={classNames(
            location.pathname.startsWith(link) ? styles.chosenItem : "",
            styles.text
          )}
        >
          {linkText}
        </div>
      </li>
    </Link>
  );
}
