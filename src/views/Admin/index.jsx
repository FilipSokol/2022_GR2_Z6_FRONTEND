import React from "react";

import styles from "./Admin.module.scss";
import DeparmentsAdmin from "../../components/DepartmentsAdmin";
import GroupsAdmin from "../../components/GroupsAdmin";
import StudentsAdmin from "../../components/StudentsAdmin";

export default function AdminPanel() {
  return (
    <div className={styles.container}>
      <DeparmentsAdmin />
      <GroupsAdmin />
      <StudentsAdmin />
    </div>
  );
}
