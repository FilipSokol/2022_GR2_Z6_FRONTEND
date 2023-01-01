import React, { useEffect, useState } from "react";
import { Modal, Table, Form } from "antd";
import Column from "antd/lib/table/Column";
import styles from "./TeacherAdmin.module.scss";
import axios from "axios";
import { notification } from "antd";

export default function TeacherAdmin() {
  const [data, setData] = useState();
  const [addStudentModalOpen, setAddStudentModalOpen] = useState(false);

  useEffect(() => {
    getAllTeacher();
  }, []);

  const [form] = Form.useForm();

  async function getAllTeacher() {
    await axios
      .get("http://localhost:5000/api/teacher")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function addNewTeacher(departmentId, firstName, lastName, email) {
    await axios
      .post(`http://localhost:5000/api/departments/${departmentId}/teachers`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
      })
      .then(() => {
        notification.success({
          message: "Added a new teacher.",
        });
        getAllTeacher();
        setAddStudentModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Error while adding new teacher.",
        });
      });
  }

  function handleNewStudent(values) {
    if (
      (values.departmentId === undefined && "") ||
      (values.firstName === undefined && "") ||
      (values.lastName === undefined && "") ||
      (values.email === undefined && "")
    ) {
      notification.error({
        message: "Fill all fields.",
      });
    } else {
      addNewTeacher(
        values.departmentId,
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
            <div className={styles.headerTitle}>Teachers</div>
            <div className={styles.headerButton}>
              <button
                onClick={() => {
                  setAddStudentModalOpen(true);
                }}
                className={styles.tableHeaderButton}
              >
                New Teacher
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
              title="Teacher Id"
              dataIndex="teacherId"
              key="teacherId"
              width="16.6%"
            />
            <Column
              title="Department Id"
              dataIndex="departmentId"
              key="departmentId"
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
        title="Add a new teacher"
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
