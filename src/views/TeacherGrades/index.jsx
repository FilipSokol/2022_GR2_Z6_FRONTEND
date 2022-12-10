import { Table } from "antd";
import "antd/dist/antd.css";
import Column from "antd/lib/table/Column";
import axios from "axios";
import React, { useState, useEffect } from "react";

import styles from "./TeacherStudentsGrades.module.scss";

export default function TeacherStudentsGrades(userData) {
  const [data, setData] = useState([]);
  const [teacherGroups, setTeacherGroups] = useState([]);
  const [groupId, setGroupId] = useState();

  async function getTeacherGroups() {
    await axios
      .get(
        `http://localhost:5000/api/teacher/${userData.userData.TeacherId}/groups`
      )
      .then((response) => {
        setTeacherGroups(response.data);
        setGroupId(response.data[0]);
      })

      .catch((error) => {
        console.log(error);
      });
  }

  async function getGroupStudentsWithGrades() {
    if (groupId) {
      await axios
        .get(`http://localhost:5000/api/groups/${groupId}/subjects`)
        .then((response) => {
          setData(response.data);
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
    getGroupStudentsWithGrades();
  }, [groupId]);

  console.log(data);

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
      <div className={styles.groupContext}>
        {data.map((subject) => {
          return (
            <div className={styles.table}>
              <div>{subject.name} POPPPPPRAAAWIĆ STYLE</div>
              <Table
                dataSource={subject.students}
                pagination={false}
                loading={subject.students === undefined}
              >
                <Column
                  title="Name"
                  dataIndex="firstName"
                  key="firstName"
                  width="33%"
                  render={(firstName, data) => {
                    return (
                      <div className="whitespace-nowrap">
                        {data.firstName + " " + data.lastName}
                      </div>
                    );
                  }}
                />
                <Column
                  title="Marks"
                  dataIndex="marks"
                  key="marks"
                  width="50%"
                  render={(marks) => (
                    <div className="whitespace-nowrap">
                      {marks.map((mark, idx) => {
                        return (
                          <>
                            {mark.markValue}{" "}
                            {idx < marks.length - 1 ? ", " : ""}
                          </>
                        );
                      })}
                    </div>
                  )}
                />
                <Column
                  dataIndex="marks"
                  key="marks"
                  width="16.5%"
                  render={(marks) => (
                    <button
                      onClick={() => {
                        console.log("Click");
                      }}
                      className={styles.tableButton}
                    >
                      Add Mark
                    </button>
                  )}
                />
              </Table>
            </div>
          );
        })}
      </div>
    </div>
  );
}
