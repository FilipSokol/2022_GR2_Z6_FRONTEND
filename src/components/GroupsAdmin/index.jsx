import React, { useEffect, useState } from "react";
import { Modal, notification, Table } from "antd";
import Column from "antd/lib/table/Column";
import styles from "./GroupsAdmin.module.scss";
import axios from "axios";

export default function GroupsAdmin() {
  const [departmentsData, setDepartmentsData] = useState();
  const [departmentsGroupData, setDepartmentsGroupData] = useState();
  const [deparmentModalOpen, setDeparmentModalOpen] = useState(false);

  useEffect(() => {
    getDepartmentsData();
  }, []);

  async function getDepartmentsData() {
    await axios
      .get("http://localhost:5000/api/departments")
      .then((response) => {
        setDepartmentsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getDepartmentsGroupData(departmentId) {
    await axios
      .get(`http://localhost:5000/api/departments/${departmentId}/groups`)
      .then((response) => {
        setDepartmentsGroupData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function deleteDepartment(departmentId) {
    await axios
      .delete(`http://localhost:5000/api/departments/${departmentId}`)
      .then((response) => {
        if (response.status) {
          getDepartmentsGroupData(departmentId);
          notification.success({
            message: "Pomyślnie usunięto wydział.",
          });
        } else {
          notification.error({
            message: "Błąd usuwania wydziału.",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: "Błąd usuwania grupy.",
        });
      });
  }

  async function getDeleteGroup(departmentId, groupId) {
    await axios
      .delete(
        `http://localhost:5000/api/departments/${departmentId}/groups/${groupId}`
      )
      .then((response) => {
        if (response.status) {
          getDepartmentsGroupData(departmentId);
          notification.success({
            message: "Pomyślnie usunięto grupę.",
          });
        } else {
          notification.error({
            message: "Błąd usuwania grupy.",
          });
        }
      })
      .catch(() => {
        notification.error({
          message: "Błąd usuwania grupy.",
        });
      });
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableBox}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.headerTitle}>Grupy</div>
            <div className={styles.headerButton}>
              <button
                onClick={() => {
                  undefined;
                }}
                className={styles.tableHeaderButton}
              >
                Dodaj Grupe
              </button>
            </div>
          </div>
          <Table
            dataSource={departmentsData}
            loading={departmentsData === undefined}
            pagination={{
              className: styles.pagination,
              defaultPageSize: 10,
            }}
            locale={{
              emptyText: "Brak Danych",
              triggerDesc: "Zmień kolejność sortowania",
              triggerAsc: "Włącz sortowanie",
              cancelSort: "Wyłącz sortowanie",
            }}
          >
            <Column title="Nazwa" dataIndex="name" key="name" width="16.6%" />
            <Column title="Miasto" dataIndex="city" key="city" width="16.6%" />
            <Column
              title="Adres"
              dataIndex="address"
              key="address"
              width="16.6%"
            />
            <Column title="Miasto" dataIndex="city" key="city" width="16.6%" />
            <Column
              dataIndex="departmentId"
              key="departmentId"
              width="10%"
              render={(departmentId) => (
                <button
                  onClick={() => {
                    getDepartmentsGroupData(departmentId);
                    setDeparmentModalOpen(true);
                  }}
                  className={styles.tableButton}
                >
                  Pokaż Grupy
                </button>
              )}
            />
            <Column
              dataIndex="departmentId"
              key="departmentId"
              width="8%"
              render={(departmentId) => (
                <button
                  onClick={() => {
                    deleteDepartment(departmentId);
                    getDepartmentsData();
                  }}
                  className={styles.tableButton}
                >
                  Usuń
                </button>
              )}
            />
          </Table>
        </div>
      </div>
      <Modal
        title="Grupy przypisane do wydziału"
        cancelText="Anuluj"
        centered
        visible={deparmentModalOpen}
        onCancel={() => {
          setDepartmentsGroupData(undefined);
          setDeparmentModalOpen(false);
        }}
        footer={null}
      >
        <div className={styles.modalBox}>
          <div className={styles.table}>
            <Table
              dataSource={departmentsGroupData}
              pagination={false}
              scroll={{ x: 200, y: 540 }}
              loading={departmentsGroupData === undefined}
              locale={{
                emptyText: "Brak Danych",
                triggerDesc: "Zmień kolejność sortowania",
                triggerAsc: "Włącz sortowanie",
                cancelSort: "Wyłącz sortowanie",
              }}
            >
              <Column
                title="Id"
                width="10%"
                render={(value, item, index) => index + 1}
              />
              <Column title="Nazwa" dataIndex="name" key="name" width="20%" />
              <Column
                width="10%"
                render={(data) => (
                  <button
                    onClick={() => {
                      getDeleteGroup(data.departmentId, data.groupId);
                    }}
                    className={styles.tableButton}
                  >
                    Usuń
                  </button>
                )}
              />
            </Table>
          </div>
        </div>
      </Modal>
    </div>
  );
}
