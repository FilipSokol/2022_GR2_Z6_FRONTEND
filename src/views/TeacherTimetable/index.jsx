import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  Month,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import axios from "axios";
import React, { useState, useEffect } from "react";

import styles from "./TeacherTimetable.module.scss";

export default function TimeTable(userData) {
  const [data, setData] = useState([]);

  async function getSchedule() {
    await axios
      .get(`http://localhost:5000/api/schedules/${userData.userData.GroupId}`)
      .then((response) => {
        let id = 0;
        let newArray = [];
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
        startHour="06:00"
        endHour="21:00"
        readOnly={true}
        showQuickInfo={false}
        allowMultiDrag={false}
        allowMultiCellSelection={false}
        allowMultiRowSelection={false}
        selectedDate={new Date()}
        eventSettings={{ dataSource: data }}
      >
        <ViewsDirective>
          <ViewDirective option="Day" displayName="Dzień" />
          <ViewDirective option="Week" displayName="Tydzień" />
          <ViewDirective option="Month" displayName="Miesiąc" />
        </ViewsDirective>
        <Inject services={[Day, Week, Month]} />
      </ScheduleComponent>
    </div>
  );
}
