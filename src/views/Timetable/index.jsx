import React from "react";
// import FullCalendar from "@fullcalendar/react"; // must go before plugins
// import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

import styles from "./Timetable.module.scss";

export default function TimeTable() {
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
