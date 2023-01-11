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

export default function TeacherTimeTable(userData) {
  const [data, setData] = useState([]);
  const [teacherGroups, setTeacherGroups] = useState([]);
  const [groupId, setGroupId] = useState();

  async function getTeacherGroups() {
    await axios
      .get(
        `https://student-service-app.azurewebsites.net/api/teacher/${userData.userData.TeacherId}/groups`
      )
      .then((response) => {
        setTeacherGroups(response.data);
        setGroupId(response.data[0]);
      })

      .catch((error) => {
        console.log(error);
      });
  }

  async function getSchedule() {
    if (groupId) {
      await axios
        .get(
          `https://student-service-app.azurewebsites.net/api/schedules/${groupId}`
        )
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
  }

  useEffect(() => {
    getTeacherGroups();
  }, []);

  useEffect(() => {
    getSchedule();
  }, [groupId]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {teacherGroups.map((id) => {
          return (
            <button
              onClick={() => setGroupId(id)}
              className={
                id === groupId ? styles.buttonActive : styles.buttonNotActive
              }
            >
              Group {id}
            </button>
          );
        })}
      </div>
      <div className={styles.timeTable}>
        <ScheduleComponent
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
            <ViewDirective option="Day" />
            <ViewDirective option="Week" />
            <ViewDirective option="Month" />
          </ViewsDirective>
          <Inject services={[Day, Week, Month]} />
        </ScheduleComponent>
      </div>
    </div>
  );
}
