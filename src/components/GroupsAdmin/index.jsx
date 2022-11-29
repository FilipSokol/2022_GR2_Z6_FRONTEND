import React, { useEffect, useState } from "react";
import { Modal, notification, Table, Form } from "antd";
import Column from "antd/lib/table/Column";
import styles from "./GroupsAdmin.module.scss";
import axios from "axios";

export default function GroupsAdmin() {
  const [data, setData] = useState();
  const [departmentsData, setDepartmentsData] = useState();
  const [departmentId, setDepartmentId] = useState(1);
  const [editedGroupData, setEditedGroupData] = useState();

  const [addGroupModalOpen, setAddGroupModalOpen] = useState(false);

  const [editedDepartmentId, setEditedDepartmentId] = useState();
  const [groupData, setGroupData] = useState();
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [editDepartmentModalOpen, setEditDepartmentModalOpen] = useState(false);

  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();

  useEffect(() => {
    getDepartmentsData();
    getGroupsData();
  }, []);

  async function getGroupsData(departmentId) {
    await axios
      .get(
        `http://localhost:5000/api/departments/${
          departmentId ? departmentId : 1
        }/groups`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

  async function addNewGroup(name) {
    await axios
      .post(`http://localhost:5000/api/departments/${departmentId}/groups`, {
        name,
      })
      .then(() => {
        getGroupsData(departmentId);
        notification.success({
          message: "Pomyślnie dodano grupę.",
        });
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: "Błąd dodawania grupy.",
        });
      });
  }

  async function editGroup(name, departmentId) {
    await axios
      .put(
        `http://localhost:5000/api/departments/${departmentId}/groups/${editedGroupData.groupId}`,
        {
          name: name,
          departmentId: departmentId,
        }
      )
      .then((response) => {
        if (response.status) {
          setEditedGroupData(null);
          getGroupsData(setEditedGroupData.groupId);
          handleCancel();
          notification.success({
            message: "Pomyślnie edytowano grupę.",
          });
        } else {
          setEditedGroupData(null);
          notification.error({
            message: "Błąd edytowania grupy.",
          });
        }
      })
      .catch((error) => {
        setEditedGroupData(null);
        console.log(error);
        notification.error({
          message: "Błąd edytowania grupy.",
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
          getGroupsData(departmentId);
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
  // ====================================

  async function getDepartmentsGroupData(departmentId) {
    await axios
      .get(`http://localhost:5000/api/departments/${departmentId}/groups`)
      .then((response) => {
        setGroupData(response.data);
        setAddGroupModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: "Błąd dodawania grupy.",
        });
      });
  }

  function handleNewGroup(values) {
    if (values.name === undefined) {
      notification.error({
        message: "Proszę wypełnić wszystkie pola.",
      });
    } else {
      setAddGroupModalOpen(false);
      addNewGroup(values.name);
    }
  }

  function handleEditDepartment(values) {
    if (
      (values.name === undefined && "") ||
      (values.departmentId === undefined && "")
    ) {
      notification.error({
        message: "Proszę wypełnić wszystkie pola.",
      });
    } else {
      editGroup(values.name, values.departmentId);
    }
  }

  function handleCancel() {
    setEditedGroupData(null);
    form.resetFields();
    setEditDepartmentModalOpen(false);
    setAddGroupModalOpen(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableBox}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.headerTitle}>Grupy</div>
            <div className={styles.headerSelectBox}>
              <select
                onChange={(e) => {
                  setDepartmentId(e.target.value);
                  getGroupsData(e.target.value);
                }}
              >
                {departmentsData?.map((option) => (
                  <option value={option.departmentId}>{option.name}</option>
                ))}
              </select>
            </div>
            <div className={styles.headerButton}>
              <button
                onClick={() => {
                  setAddGroupModalOpen(true);
                }}
                className={styles.tableHeaderButton}
              >
                Dodaj Grupe
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
                  Pokaż Plan Zajęć
                </button>
              )}
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
                  Pokaż Studentów
                </button>
              )}
            />
            <Column
              width="8%"
              render={(data) => (
                <button
                  onClick={() => {
                    setEditedGroupData(data);
                    setEditDepartmentModalOpen(true);
                  }}
                  className={styles.tableButton}
                >
                  Edytuj
                </button>
              )}
            />
            <Column
              width="8%"
              render={(values) => (
                <button
                  onClick={() => {
                    getDeleteGroup(values.departmentId, values.groupId);
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
        title="Dodaj nową grupę"
        cancelText="Anuluj"
        okText="Dodaj"
        centered
        okButtonProps={{
          style: { backgroundColor: "#00B8E9", border: 0, borderRadius: 0 },
        }}
        cancelButtonProps={{
          style: { borderRadius: 0 },
        }}
        visible={addGroupModalOpen}
        onCancel={handleCancel}
        onOk={form.submit}
      >
        <Form
          form={form}
          onFinish={handleNewGroup}
          className={styles.modalFormBox}
        >
          <Form.Item name="name" className={styles.modalFormInput}>
            <input type="text" name="name" placeholder="Nazwa" />
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
            initialValue={editedGroupData?.name}
            name="name"
            className={styles.modalFormInput}
          >
            <input
              type="text"
              name="name"
              defaultValue={editedGroupData?.name}
              placeholder="Nazwa"
            />
          </Form.Item>
          <Form.Item
            initialValue={editedGroupData?.departmentId}
            name="departmentId"
            className={styles.modalFormInput}
          >
            <input
              type="text"
              name="departmentId"
              defaultValue={editedGroupData?.departmentId}
              placeholder="ID Wydział"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
