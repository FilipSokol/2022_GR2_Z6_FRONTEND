import React from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import Column from "antd/lib/table/Column";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styles from "./StudentGrades.module.scss";

export default function StudentGrades(userData) {
  const [data, setData] = useState([]);

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

  return (
    <div className={styles.container}>
      <div className={styles.headerBox}>
        <div className={styles.semesterBox}>User grades</div>

        <div className={styles.buttonsBox}>
          <div className={styles.buttonActive}>
            {
              userData.userData[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
              ]
            }
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
            >
              <Column title="Subject" dataIndex="name" key="name" width="50%" />
              <Column
                title="Grades"
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
