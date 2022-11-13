import classNames from "classnames";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import SvgIcon from "../SvgIcon";
import styles from "./LinkMenu.module.scss";

export default function LinkMenu(props) {
  const { icon, link, linkText, mobile } = props;

  const location = useLocation();

  return (
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
