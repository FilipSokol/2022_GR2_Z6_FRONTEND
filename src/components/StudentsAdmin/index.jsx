import React, { useEffect, useState } from "react";
import { Modal, Table, Form } from "antd";
import Column from "antd/lib/table/Column";
import styles from "./StudentsAdmin.module.scss";
import axios from "axios";
import { notification } from "antd";

export default function StudentsAdmin() {
  const [data, setData] = useState();
  const [addStudentModalOpen, setAddStudentModalOpen] = useState(false);

  useEffect(() => {
    getAllStudents();
  }, []);

  const [form] = Form.useForm();

  async function getAllStudents() {
    await axios
      .get("https://student-service-app.azurewebsites.net/api/students")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function addNewStudent(
    departmentId,
    groupId,
    firstName,
    lastName,
    email
  ) {
    await axios
      .post(
        `https://student-service-app.azurewebsites.net/api/departments/${departmentId}/groups/${groupId}/students`,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
        }
      )
      .then(() => {
        notification.success({
          message: "Added a new student.",
        });
        setAddStudentModalOpen(false);
        getAllStudents();
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Error while adding new student.",
        });
      });
  }

  function handleNewStudent(values) {
    if (
      (values.departmentId === undefined && "") ||
      (values.groupId === undefined && "") ||
      (values.firstName === undefined && "") ||
      (values.lastName === undefined && "") ||
      (values.email === undefined && "")
    ) {
      notification.error({
        message: "Fill all fields.",
      });
    } else {
      addNewStudent(
        values.departmentId,
        values.groupId,
        values.firstName,
        values.lastName,
        values.email
      );
    }
  }

  function handleCancel() {
    form.resetFields();
    setAddStudentModalOpen(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableBox}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.headerTitle}>Students</div>
            <div className={styles.headerButton}>
              <button
                onClick={() => {
                  setAddStudentModalOpen(true);
                }}
                className={styles.tableHeaderButton}
              >
                New Student
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
            <Column
              title="Student Id"
              dataIndex="studentId"
              key="studentId"
              width="16.6%"
            />
            <Column
              title="Group Id"
              dataIndex="groupId"
              key="groupId"
              width="16.6%"
            />
            <Column
              title="Firstname"
              dataIndex="firstName"
              key="firstName"
              width="16.6%"
            />
            <Column
              title="Lastname"
              dataIndex="lastName"
              key="lastName"
              width="16.6%"
            />
          </Table>
        </div>
      </div>

      <Modal
        title="Add a new student"
        centered
        okButtonProps={{
          style: { backgroundColor: "#00B8E9", border: 0, borderRadius: 0 },
        }}
        cancelButtonProps={{
          style: { borderRadius: 0 },
        }}
        open={addStudentModalOpen}
        onCancel={handleCancel}
        onOk={form.submit}
      >
        <Form
          form={form}
          onFinish={handleNewStudent}
          className={styles.modalFormBox}
        >
          <Form.Item name="departmentId" className={styles.modalFormInput}>
            <input
              type="number"
              name="departmentId"
              placeholder="Department Id"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </Form.Item>
          <Form.Item name="groupId" className={styles.modalFormInput}>
            <input
              type="number"
              name="groupId"
              placeholder="Group Id"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </Form.Item>
          <Form.Item name="firstName" className={styles.modalFormInput}>
            <input type="text" name="firstName" placeholder="FirstName" />
          </Form.Item>
          <Form.Item name="lastName" className={styles.modalFormInput}>
            <input type="text" name="lastName" placeholder="LastName" />
          </Form.Item>
          <Form.Item name="email" className={styles.modalFormInput}>
            <input type="text" name="email" placeholder="Email" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
