import React from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

import styles from "./StudentGrades.module.scss";

export default function StudentGrades() {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.headerBox}>
        <div className={styles.semesterBox}>
          {location.pathname !== "/oceny/ogolne"
            ? "Semestr zimowy 2022/2023"
            : null}
        </div>

        <div className={styles.buttonsBox}>
          <Link to="semestr">
            <div
              className={
                location.pathname === "/oceny" ||
                location.pathname === "/oceny/semestr"
                  ? styles.buttonActive
                  : styles.buttonNotActive
              }
            >
              Oceny bieżące
            </div>
          </Link>
          <Link to="ogolne">
            <div
              className={
                location.pathname === "/oceny/ogolne"
                  ? styles.buttonActive
                  : styles.buttonNotActive
              }
            >
              Oceny śródroczne
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.outletBox}>
        <Outlet />
      </div>
    </div>
  );
}
