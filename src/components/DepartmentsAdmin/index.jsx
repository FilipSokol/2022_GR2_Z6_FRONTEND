import React, { useEffect, useState } from "react";
import { Modal, notification, Table, Form } from "antd";
import Column from "antd/lib/table/Column";
import styles from "./DepartsmentsAdmin.module.scss";
import axios from "axios";

export default function DeparmentsAdmin() {
  const [data, setData] = useState();
  const [editedDepartmentId, setEditedDepartmentId] = useState();
  const [editedDepartmentData, setEditedDepartmentData] = useState();
  const [groupData, setGroupData] = useState();
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [addDepartmentModalOpen, setAddDepartmentModalOpen] = useState(false);
  const [editDepartmentModalOpen, setEditDepartmentModalOpen] = useState(false);

  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();

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

  async function createDepartment(name, address, city, postalCode) {
    await axios
      .post("http://localhost:5000/api/departments", {
        name: name,
        address: address,
        city: city,
        postalCode: postalCode,
      })
      .then((response) => {
        if (response.status) {
          getDepartmentsData();
          handleCancel();
          notification.success({
            message: "Pomyślnie dodano wydział.",
          });
        } else {
          notification.error({
            message: "Błąd dodawania wydziału.",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: "Błąd dodawania wydziału.",
        });
      });
  }

  async function editDepartment(departmentId, name, address, city, postalCode) {
    console.log(departmentId, name, address, city, postalCode);

    await axios
      .put(`http://localhost:5000/api/departments/${departmentId}`, {
        name: name,
        address: address,
        city: city,
        postalCode: postalCode,
      })
      .then((response) => {
        if (response.status) {
          setEditedDepartmentData(null);
          getDepartmentsData();
          handleCancel();
          notification.success({
            message: "Pomyślnie edytowano wydział.",
          });
        } else {
          setEditedDepartmentData(null);
          notification.error({
            message: "Błąd edytowania wydziału.",
          });
        }
      })
      .catch((error) => {
        setEditedDepartmentData(null);
        console.log(error);
        notification.error({
          message: "Błąd edytowania wydziału.",
        });
      });
  }

  async function deleteDepartment(departmentId) {
    await axios
      .delete(`http://localhost:5000/api/departments/${departmentId}`)
      .then((response) => {
        if (response.status) {
          getDepartmentsData();
          setWarningModalOpen(false);
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
          message: "Błąd usuwania wydziału.",
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

  function handleNewDepartment(values) {
    if (
      (values.name === undefined && "") ||
      (values.address === undefined && "") ||
      (values.city === undefined && "") ||
      (values.postalCode === undefined && "")
    ) {
      notification.error({
        message: "Proszę wypełnić wszystkie pola.",
      });
    } else {
      createDepartment(
        values.name,
        values.address,
        values.city,
        values.postalCode
      );
    }
  }

  function handleEditDepartment(values) {
    if (
      (values.name === undefined && "") ||
      (values.address === undefined && "") ||
      (values.city === undefined && "") ||
      (values.postalCode === undefined && "")
    ) {
      notification.error({
        message: "Proszę wypełnić wszystkie pola.",
      });
    } else {
      editDepartment(
        editedDepartmentData.departmentId,
        values.name,
        values.address,
        values.city,
        values.postalCode
      );
    }
  }

  function handleCancel() {
    setEditedDepartmentData(null);
    form.resetFields();
    setEditDepartmentModalOpen(false);
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
              size: "small",
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
            <Column
              title="Kod Pocztowy"
              dataIndex="postalCode"
              key="postalCode"
              width="16.6%"
            />
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
              width="8%"
              render={(data) => (
                <button
                  onClick={() => {
                    setEditedDepartmentData(data);
                    setEditDepartmentModalOpen(true);
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
                    setEditedDepartmentId(departmentId);
                    setWarningModalOpen(true);
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
        title={false}
        closable={false}
        cancelText="Anuluj"
        okText="Tak"
        okButtonProps={{
          style: { backgroundColor: "#00B8E9", border: 0, borderRadius: 0 },
        }}
        cancelButtonProps={{
          style: { borderRadius: 0 },
        }}
        centered
        visible={warningModalOpen}
        onCancel={() => {
          setEditedDepartmentId(null);
          setWarningModalOpen(false);
        }}
        onOk={() => {
          deleteDepartment(editedDepartmentId);
        }}
      >
        <div className={styles.modalBox}>
          <div className={styles.modalWarningText}>
            Czy na pewno chcesz usunąć wydział?
          </div>
        </div>
      </Modal>
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
        okButtonProps={{
          style: { backgroundColor: "#00B8E9", border: 0, borderRadius: 0 },
        }}
        cancelButtonProps={{
          style: { borderRadius: 0 },
        }}
        visible={addDepartmentModalOpen}
        onCancel={handleCancel}
        onOk={form.submit}
      >
        <Form
          form={form}
          onFinish={handleNewDepartment}
          className={styles.modalFormBox}
        >
          <Form.Item name="name" className={styles.modalFormInput}>
            <input type="text" name="name" placeholder="Nazwa" />
          </Form.Item>
          <Form.Item name="address" className={styles.modalFormInput}>
            <input type="text" name="address" placeholder="Adres" />
          </Form.Item>
          <Form.Item name="city" className={styles.modalFormInput}>
            <input type="text" name="city" placeholder="Miasto" />
          </Form.Item>
          <Form.Item name="postalCode" className={styles.modalFormInput}>
            <input type="text" name="postalCode" placeholder="Kod pocztowy" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edytuj wydział"
        cancelText="Anuluj"
        okText="Edytuj"
        centered
        okButtonProps={{
          style: { backgroundColor: "#00B8E9", border: 0, borderRadius: 0 },
        }}
        cancelButtonProps={{
          style: { borderRadius: 0 },
        }}
        visible={editDepartmentModalOpen}
        onCancel={handleCancel}
        onOk={formEdit.submit}
      >
        <Form
          form={formEdit}
          onFinish={handleEditDepartment}
          className={styles.modalFormBox}
        >
          <Form.Item
            initialValue={editedDepartmentData?.name}
            name="name"
            className={styles.modalFormInput}
          >
            <input
              type="text"
              name="name"
              defaultValue={editedDepartmentData?.name}
              placeholder="Nazwa"
            />
          </Form.Item>
          <Form.Item
            initialValue={editedDepartmentData?.address}
            name="address"
            className={styles.modalFormInput}
          >
            <input
              type="text"
              name="address"
              defaultValue={editedDepartmentData?.address}
              placeholder="Adres"
            />
          </Form.Item>
          <Form.Item
            initialValue={editedDepartmentData?.city}
            name="city"
            className={styles.modalFormInput}
          >
            <input
              type="text"
              name="city"
              defaultValue={editedDepartmentData?.city}
              placeholder="Miasto"
            />
          </Form.Item>
          <Form.Item
            initialValue={editedDepartmentData?.postalCode}
            name="postalCode"
            className={styles.modalFormInput}
          >
            <input
              type="text"
              name="postalCode"
              defaultValue={editedDepartmentData?.postalCode}
              placeholder="Kod pocztowy"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
