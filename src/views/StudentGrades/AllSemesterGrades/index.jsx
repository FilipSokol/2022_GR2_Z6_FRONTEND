import React from "react";

import styles from "./AllSemesterGrades.module.scss";

export default function AllSemesterGrades() {
  return (
    <div className={styles.container}>
      Plan zajeć
      {/* <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={[
          { title: "event 1", date: "2019-04-01" },
          { title: "event 2", date: "2019-04-02" },
        ]}
      /> */}
    </div>
  );
}
