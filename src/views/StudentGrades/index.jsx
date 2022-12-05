import React from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import Column from "antd/lib/table/Column";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styles from "./StudentGrades.module.scss";

export default function StudentGrades(userData) {
  // console.log(userData);
  const userGrades = [
    {
      id: "1",
      subject: "Programowanie niskopoziomowe",
      grades: "2, 2, 2, 2, 2, 2, 2",
    },
    {
      id: "2",
      subject: "Technika cyfrowa",
      grades: "2, 2, 2, 2, 2",
    },
    {
      id: "3",
      subject: "Analiza i przetwarzanie obrazów cyfrowych",
      grades: "5, 4, 3, 4",
    },
  ];

  const [data, setData] = useState([]);

  // const getAllSubjects = () => {
  //   axios
  //     .get(
  //       `http://localhost:5000/api/students/${userData.userData.StudentId}/marks`
  //     )
  //     .then((res) => {
  //       setData(res.data);
  //     });
  // };

  console.log(userData.userData.StudentId);
  const getAllSubjectsWithGrades = () => {
    axios
      .get(
        `http://localhost:5000/api/subjects/${userData.userData.StudentId}/student`
      )
      .then((res) => {
        setData(res.data);
      });
  };

  useEffect(() => {
    getAllSubjectsWithGrades();
  }, []);

  console.log(data);

  return (
    <div className={styles.container}>
      <div className={styles.headerBox}>
        <div className={styles.semesterBox}>
          {location.pathname !== "/oceny/ogolne"
            ? "Semestr zimowy 2022/2023"
            : null}
        </div>

        <div className={styles.buttonsBox}>
          <div
            className={
              location.pathname === "/oceny" ||
              location.pathname === "/oceny/semestr"
                ? styles.buttonActive
                : styles.buttonNotActive
            }
          >
            Oceny bieżące
          </div>
        </div>
      </div>
      <div className={styles.outletBox}>
        <div className={styles.outletContent}>
          <div className={styles.table}>
            <Table
              dataSource={data}
              pagination={false}
              loading={data === undefined}
              locale={{
                emptyText: "Brak Danych",
                triggerDesc: "Zmień kolejność sortowania",
                triggerAsc: "Włącz sortowanie",
                cancelSort: "Wyłącz sortowanie",
              }}
            >
              <Column
                title="Przedmiot"
                dataIndex="name"
                key="name"
                width="50%"
              />
              <Column
                title="Oceny"
                dataIndex="marks"
                key="marks"
                width="50%"
                render={(marks) => (
                  <div className="whitespace-nowrap">
                    {marks.map((mark, idx) => {
                      return (
                        <>
                          {mark} {idx < marks.length - 1 ? ", " : ""}
                        </>
                      );
                    })}
                  </div>
                )}
              />
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
