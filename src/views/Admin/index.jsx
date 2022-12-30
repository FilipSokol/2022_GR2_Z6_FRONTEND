import React, { useState } from "react";

import styles from "./Admin.module.scss";
import DeparmentsAdmin from "../../components/DepartmentsAdmin";
import GroupsAdmin from "../../components/GroupsAdmin";
import StudentsAdmin from "../../components/StudentsAdmin";
import TeacherAdmin from "../../components/TeacherAdmin";
import ButtonsAdmin from "../../components/ButtonsAdmin";

export default function AdminPanel() {
  const [dataDeparments, setDeparmentsData] = useState("test");

  return (
    <div className={styles.container}>
      <ButtonsAdmin />
      <DeparmentsAdmin />
      <GroupsAdmin />
      <StudentsAdmin />
      <TeacherAdmin />
    </div>
  );
}
