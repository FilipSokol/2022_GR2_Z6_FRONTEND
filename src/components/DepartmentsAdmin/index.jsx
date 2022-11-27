import React, { useEffect, useState } from "react";
import { Modal, notification, Table, Form } from "antd";
import Column from "antd/lib/table/Column";
import styles from "./DepartsmentsAdmin.module.scss";
import axios from "axios";

export default function DeparmentsAdmin() {
  const [data, setData] = useState();
  const [groupData, setGroupData] = useState();
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [addDepartmentModalOpen, setAddDepartmentModalOpen] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    getDepartmentsData();
  }, []);

  async function getDepartmentsData() {
    await axios
      .get("http://localhost:5000/api/departments")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getDepartmentsGroupData(departmentId) {
    await axios
      .get(`http://localhost:5000/api/departments/${departmentId}/groups`)
      .then((response) => {
        setGroupData(response.data);
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

  function handleNewDepartment(e) {
    // e.preventDefault();

    console.log(e);
  }

  function handleCancel() {
    form.resetFields();
    setAddDepartmentModalOpen(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableBox}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.headerTitle}>Wydziały</div>
            <div className={styles.headerButton}>
              <button
                onClick={() => {
                  setAddDepartmentModalOpen(true);
                }}
                className={styles.tableHeaderButton}
              >
                Dodaj Wydział
              </button>
            </div>
          </div>
          <Table
            dataSource={data}
            loading={data === undefined}
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
                    setGroupModalOpen(true);
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
                  Edytuj
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
        visible={groupModalOpen}
        onCancel={() => {
          setGroupData(undefined);
          setGroupModalOpen(false);
        }}
        footer={null}
      >
        <div className={styles.modalBox}>
          <div className={styles.table}>
            <Table
              dataSource={groupData}
              pagination={false}
              scroll={{ x: 200, y: 540 }}
              loading={groupData === undefined}
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
      <Modal
        title="Dodaj nowy wydział"
        cancelText="Anuluj"
        okText="Dodaj"
        centered
        visible={addDepartmentModalOpen}
        onCancel={handleCancel}
        onOk={form.submit}
      >
        <Form
          form={form}
          onFinish={handleNewDepartment}
          className={styles.modalFormBox}
        >
          <input type="text" name="name" placeholder="Nazwa" />
          <input type="text" name="address" placeholder="Adres" />
          <input type="text" name="city" placeholder="Miasto" />
          <input type="text" name="postalCode" placeholder="Kod pocztowy" />
        </Form>
      </Modal>
    </div>
  );
}
