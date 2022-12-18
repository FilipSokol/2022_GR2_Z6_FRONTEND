import React, { useState } from "react";

import styles from "./Admin.module.scss";
import DeparmentsAdmin from "../../components/DepartmentsAdmin";
import GroupsAdmin from "../../components/GroupsAdmin";
import StudentsAdmin from "../../components/StudentsAdmin";

export default function AdminPanel() {
  const [dataDeparments, setDeparmentsData] = useState("test");

  return (
    <div className={styles.container}>
      <DeparmentsAdmin
        dataDeparments={dataDeparments}
        setDeparmentsData={setDeparmentsData}
      />
      <GroupsAdmin />
      <StudentsAdmin />
    </div>
  );
}
