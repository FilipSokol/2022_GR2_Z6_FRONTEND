import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  MonthAgenda,
  TimelineViews,
  TimelineMonth,
} from "@syncfusion/ej2-react-schedule";
import axios from "axios";
import React, { useState, useEffect } from "react";

import styles from "./Timetable.module.scss";

export default function TimeTable(userData) {
  const [data, setData] = useState([]);

  async function getSchedule() {
    await axios
      .get(`http://localhost:5000/api/schedules/${userData.userData.GroupId}`)
      .then((response) => {
        let id = 0;
        let newArray = [];
        console.log(response);
        response.data.forEach((element) => {
          let obj = {
            Id: id,
            Subject: element.name,
            StartTime: element.startTime,
            EndTime: element.endTime,
            IsAllDay: false,
          };
          id = id + 1;
          newArray.push(obj);

          if (response.data.length === newArray.length) {
            setData(newArray);
          }
        });
      })

      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <div className={styles.container}>
      <ScheduleComponent
        height="100vh"
        currentView="Week"
        selectedDate={new Date()}
        eventSettings={{ dataSource: data }}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
}
