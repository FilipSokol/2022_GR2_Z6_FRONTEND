import React, { useEffect, useState } from "react";
import { Modal, Table, Form } from "antd";
import Column from "antd/lib/table/Column";
import styles from "./ButtonsAdmin.module.scss";
import axios from "axios";
import { notification } from "antd";

export default function ButtonsAdmin() {
  const [addSubjectModalOpen, setAddSubjectModalOpen] = useState(false);

  const [form] = Form.useForm();

  async function addNewSubject(data) {
    await axios
      .post(`http://localhost:5000/api/subjects`, {
        name: data.name,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        scheduleId: data.scheduleId,
        ects: 1,
        type: "unknown",
        teacherId: data.teacherId,
      })
      .then(() => {
        notification.success({
          message: "Added a new subject.",
        });
        form.resetFields();
        setAddSubjectModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Error while adding new subject.",
        });
      });
  }

  function handleNewSubject(values) {
    if (
      (values.name === undefined && "") ||
      (values.description === undefined && "") ||
      (values.startTime === undefined && "") ||
      (values.endTime === undefined && "") ||
      (values.scheduleId === undefined && "") ||
      (values.teacherId === undefined && "")
    ) {
      notification.error({
        message: "Fill all fields.",
      });
    } else {
      addNewSubject(values);
    }
  }

  function handleCancel() {
    form.resetFields();
    setAddSubjectModalOpen(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableBox}>
        <button
          className={styles.tableButton}
          onClick={() => setAddSubjectModalOpen(true)}
        >
          New Subject
        </button>
      </div>

      <Modal
        title="Add a new subject"
        centered
        okButtonProps={{
          style: { backgroundColor: "#00B8E9", border: 0, borderRadius: 0 },
        }}
        cancelButtonProps={{
          style: { borderRadius: 0 },
        }}
        open={addSubjectModalOpen}
        onCancel={handleCancel}
        onOk={form.submit}
      >
        <Form
          form={form}
          onFinish={handleNewSubject}
          className={styles.modalFormBox}
        >
          <Form.Item name="name" className={styles.modalFormInput}>
            <input type="text" name="name" placeholder="Name" />
          </Form.Item>
          <Form.Item name="description" className={styles.modalFormInput}>
            <input type="text" name="description" placeholder="Description" />
          </Form.Item>
          <Form.Item name="startTime" className={styles.modalFormInput}>
            <input
              type="text"
              name="startTime"
              onFocus={(e) => (e.target.type = "datetime-local")}
              onBlur={(e) => (e.target.type = "text")}
              placeholder="Start Time"
            />
          </Form.Item>
          <Form.Item name="endTime" className={styles.modalFormInput}>
            <input
              type="text"
              name="endTime"
              onFocus={(e) => (e.target.type = "datetime-local")}
              onBlur={(e) => (e.target.type = "text")}
              placeholder="End Time"
            />
          </Form.Item>
          <Form.Item name="scheduleId" className={styles.modalFormInput}>
            <input
              type="text"
              name="scheduleId"
              placeholder="Schedule Id"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </Form.Item>
          <Form.Item name="teacherId" className={styles.modalFormInput}>
            <input
              type="text"
              name="teacherId"
              placeholder="Teacher Id"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
