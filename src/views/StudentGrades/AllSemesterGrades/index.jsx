import React from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import Column from "antd/lib/table/Column";

import styles from "./AllSemesterGrades.module.scss";

const userGrades1 = [
  {
    id: "1",
    subject: "Programowanie niskopoziomowe",
    group: "WIM_Inf_I_06_PAI",
    grade: "3",
  },
  {
    id: "2",
    subject: "Technika cyfrowa",
    group: "WIM_Inf_I_06_PAI",
    grade: "4",
  },
  {
    id: "3",
    subject: "Analiza i przetwarzanie obrazów cyfrowych",
    group: "WIM_Inf_I_06_PAI",
    grade: "4",
  },
];

const userGrades2 = [
  {
    id: "1",
    subject: "Paradygmaty programowania",
    group: "WIM_Inf_I_05_PAI",
    grade: "4",
  },
  {
    id: "2",
    subject: "Język angielski",
    group: "WIM_Inf_I_05_PAI",
    grade: "5",
  },
];

const userGrades3 = [
  {
    id: "1",
    subject: "Matematyka dyskretna",
    group: "WIM_Inf_I_04_PAI",
    grade: "3",
  },
  {
    id: "2",
    subject: "Podstawy programowania",
    group: "WIM_Inf_I_04_PAI",
    grade: "4",
  },
  {
    id: "3",
    subject: "Analiza matematyczna",
    group: "WIM_Inf_I_04_PAI",
    grade: "3",
  },
  {
    id: "4",
    subject: "Repetytorium z matematyki",
    group: "WIM_Inf_I_04_PAI",
    grade: "5",
  },
];

export default function AllSemesterGrades() {
  return (
    <div className={styles.outletContent}>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={styles.headerTitle}>Semestr letni 2021/2022</div>
          <div className={styles.weightedGrades}>
            Średnia ważona: <b>3,42</b>
          </div>
        </div>
        <Table
          dataSource={userGrades1}
          pagination={false}
          loading={userGrades1 === undefined}
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
            width="33%"
          />
          <Column title="Grupa" dataIndex="group" key="group" width="33%" />
          <Column
            sortDirections={["ascend", "descend"]}
            sorter={(a, b) => a.grade - b.grade}
            title="Ocena"
            dataIndex="grade"
            key="grade"
            width="33%"
          />
        </Table>
      </div>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={styles.headerTitle}>Semestr zimowy 2021/2022</div>
          <div className={styles.weightedGrades}>
            Średnia ważona: <b>4,25</b>
          </div>
        </div>
        <Table
          dataSource={userGrades2}
          pagination={false}
          loading={userGrades2 === undefined}
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
            width="33%"
          />
          <Column title="Grupa" dataIndex="group" key="group" width="33%" />
          <Column
            sortDirections={["ascend", "descend"]}
            sorter={(a, b) => a.grade - b.grade}
            title="Ocena"
            dataIndex="grade"
            key="grade"
            width="33%"
          />
        </Table>
      </div>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={styles.headerTitle}>Semestr letni 2020/2021</div>
          <div className={styles.weightedGrades}>
            Średnia ważona: <b>3,82</b>
          </div>
        </div>
        <Table
          dataSource={userGrades3}
          pagination={false}
          loading={userGrades3 === undefined}
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
            width="33%"
          />
          <Column title="Grupa" dataIndex="group" key="group" width="33%" />
          <Column
            sortDirections={["ascend", "descend"]}
            sorter={(a, b) => a.grade - b.grade}
            title="Ocena"
            dataIndex="grade"
            key="grade"
            width="33%"
          />
        </Table>
      </div>
    </div>
  );
}
