import React from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import Column from "antd/lib/table/Column";

import styles from "./SemesterGrades.module.scss";

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

export default function SemesterGrades() {
  return (
    <div className={styles.outletContent}>
      <div className={styles.table}>
        <Table
          dataSource={userGrades}
          pagination={false}
          loading={userGrades === undefined}
          locale={{
            emptyText: "Brak Danych",
            triggerDesc: "Zmień kolejność sortowania",
            triggerAsc: "Włącz sortowanie",
            cancelSort: "Wyłącz sortowanie",
          }}
        >
          <Column
            title="Przedmiot"
            dataIndex="subject"
            key="subject"
            width="50%"
          />
          <Column title="Oceny" dataIndex="grades" key="grades" width="50%" />
        </Table>
      </div>
    </div>
  );
}
