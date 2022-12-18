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
          message: "Added a new group.",
        });
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: "Error while adding a new group.",
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
            message: "Eddited group information.",
          });
        } else {
          setEditedGroupData(null);
          notification.error({
            message: "Error while editing group information.",
          });
        }
      })
      .catch((error) => {
        setEditedGroupData(null);
        console.log(error);
        notification.error({
          message: "Error while editing group information.",
        });
      });
  }

  async function getDeleteGroup(departmentId, groupId) {
    await axios
      .delete(
        `http://localhost:5000/api/departments/${departmentId}/groups/${groupId}`
      )
      .then((response) => {
        console.log(response);
        if (response.status) {
          getGroupsData(departmentId);
          notification.success({
            message: "Deleted group.",
          });
        } else {
          notification.error({
            message: "Error while deleting group.",
          });
        }
      })
      .catch(() => {
        notification.error({
          message: "Error while deleting group.",
        });
      });
  }

  async function deleteStudent(dataStudents) {
    await axios
      .delete(
        `http://localhost:5000/api/departments/${dataStudents.departmentId}/groups/${dataStudents.groupId}/students/${dataStudents.studentId}`
      )
      .then(() => {
        getDepartmentsGroupData(dataStudents);
        notification.success({
          message: "Delete student successful.",
        });
      })
      .catch(() => {
        notification.error({
          message: "Error while deleting student.",
        });
      });
  }

  // ====================================

  async function getDepartmentsGroupData(dataStudents) {
    await axios
      .get(
        `http://localhost:5000/api/departments/${dataStudents.departmentId}/groups/${dataStudents.groupId}/students`
      )
      .then((response) => {
        setGroupData(response.data);
        setAddGroupModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: "Error while downloading data.",
        });
      });
  }

  function handleNewGroup(values) {
    if (values.name === undefined) {
      notification.error({
        message: "Fill all fields.",
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
        message: "Fill all fields.",
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
            <div className={styles.headerTitle}>Groups</div>
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
                New Group
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
          >
            <Column title="Nazwa" dataIndex="name" key="name" width="16.6%" />
            <Column
              width="10%"
              render={(data) => (
                <button
                  onClick={() => {
                    console.log(data);
                    getDepartmentsGroupData(data);
                    setGroupModalOpen(true);
                  }}
                  className={styles.tableButton}
                >
                  Show Schedule
                </button>
              )}
            />
            <Column
              width="10%"
              render={(data) => (
                <button
                  onClick={() => {
                    console.log(data);
                    getDepartmentsGroupData(data);
                    setGroupModalOpen(true);
                  }}
                  className={styles.tableButton}
                >
                  Students
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
                  Edit
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
                  Delete
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
        open={warningModalOpen}
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
        title="All students in group"
        centered
        open={groupModalOpen}
        onCancel={() => {
          setGroupData(undefined);
          setGroupModalOpen(false);
        }}
        footer={null}
      >
        {console.log(groupData)}
        <div className={styles.modalBox}>
          <div className={styles.table}>
            <Table
              dataSource={groupData}
              pagination={false}
              scroll={{ x: 200, y: 540 }}
              loading={groupData === undefined}
            >
              <Column
                title="Student Id"
                dataIndex="studentId"
                key="studentId"
                width="20%"
              />
              <Column
                title="Firstname"
                dataIndex="firstName"
                key="firstName"
                width="20%"
              />
              <Column
                title="Lastname"
                dataIndex="lastName"
                key="lastName"
                width="20%"
              />
              <Column title="Email" dataIndex="email" key="email" width="20%" />
              <Column
                width="30%"
                render={(data) => (
                  <button
                    onClick={() => {
                      const studentData = {
                        studentId: data.studentId,
                        groupId: data.groupId,
                        departmentId: departmentId,
                      };
                      deleteStudent(studentData);
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
        open={addGroupModalOpen}
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
        open={editDepartmentModalOpen}
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
