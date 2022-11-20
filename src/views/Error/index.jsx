import React from "react";
import styles from "./Error.module.scss";

export default function Error() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Error</div>
      <div className={styles.text}>Nie ma takiej strony!</div>
    </div>
  );
}
