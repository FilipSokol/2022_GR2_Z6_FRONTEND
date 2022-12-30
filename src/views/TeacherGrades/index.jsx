import { notification } from "antd";
import { Modal } from "antd";
import { Form } from "antd";
import { Table } from "antd";
import "antd/dist/antd.css";
import Column from "antd/lib/table/Column";
import axios from "axios";
import React, { useState, useEffect } from "react";

import styles from "./TeacherStudentsGrades.module.scss";

export default function TeacherStudentsGrades(userData) {
  const [data, setData] = useState([]);
  const [teacherGroups, setTeacherGroups] = useState([]);
  const [groupId, setGroupId] = useState();

  const [newMarkModalOpen, setNewMarkModalOpen] = useState(false);
  const [editMarkModalOpen, setEditMarkModalOpen] = useState(false);

  const [studentInfo, setStudentInfo] = useState();
  const [editedMarkData, setEditedMarkData] = useState(undefined);

  const [dataDesc, setDataDesc] = useState(null);
  const [markDesc, setMarkDesc] = useState(null);

  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();

  async function getTeacherGroups() {
    await axios
      .get(
        `http://localhost:5000/api/teacher/${userData.userData.TeacherId}/groups`
      )
      .then((response) => {
        setTeacherGroups(response.data);
        setGroupId(response.data[0]);
      })

      .catch((error) => {
        console.log(error);
      });
  }

  async function getGroupStudentsWithGrades() {
    if (groupId) {
      await axios
        .get(`http://localhost:5000/api/groups/${groupId}/subjects`)
        .then((response) => {
          setData(response.data);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }

  async function addNewMark(values) {
    await axios
      .post(
        `http://localhost:5000/api/students/${studentInfo.studentId}/marks`,
        {
          dateOfIssue: new Date(),
          subjectId: studentInfo.subjectId,
          description: values.description,
          markValue: values.markValue,
        }
      )
      .then(() => {
        notification.success({
          message: "Mark added successfully.",
        });
        getGroupStudentsWithGrades();
      })

      .catch(() => {
        notification.error({
          message: "Error while adding mark.",
        });
      });
  }

  async function udpateMark() {
    await axios
      .put(
        `http://localhost:5000/api/students/${editedMarkData.studentId}/marks/${editedMarkData.markId}`,
        {
          dateOfIssue: new Date(),
          subjectId: editedMarkData.subjectId,
          description: dataDesc,
          markValue: markDesc,
        }
      )
      .then((res) => {
        notification.success({
          message: "Mark edited successfully.",
        });
        getGroupStudentsWithGrades();
      })

      .catch((err) => {
        notification.error({
          message: "Error while editing mark.",
        });
      });
  }

  async function deleteMark() {
    await axios
      .delete(
        `http://localhost:5000/api/students/${editedMarkData.studentId}/marks/${editedMarkData.markId}`
      )
      .then((response) => {
        notification.success({
          message: "Mark deleted successfully.",
        });
        getGroupStudentsWithGrades();
        setEditMarkModalOpen(false);
      })

      .catch((error) => {
        notification.error({
          message: "Error while deleting mark.",
        });
      });
  }

  //====== modals

  function handleNewMark(values) {
    if (values.description.length < 0) {
      notification.error({
        message: "Please fill all fields.",
      });
      return null;
    }

    if (values.markValue.length < 0) {
      notification.error({
        message: "Please fill all fields.",
      });
      return null;
    }

    if (values.markValue > 5 || values.markValue < 2) {
      notification.error({
        message: "Mark range must be between 2 to 5.",
      });
      return null;
    }

    addNewMark(values);
    setNewMarkModalOpen(false);
    form.resetFields();
  }

  function handleEditMark() {
    if (dataDesc.length <= 0) {
      notification.error({
        message: "Please fill all fields.",
      });
      return null;
    }

    if (markDesc.length <= 0) {
      notification.error({
        message: "Please fill all fields.",
      });
      return null;
    }

    if (markDesc > 5 || markDesc < 2) {
      notification.error({
        message: "Mark range must be between 2 to 5.",
      });
      return null;
    }

    udpateMark();

    setEditMarkModalOpen(false);
    form.resetFields();
    setEditedMarkData(undefined);
  }

  useEffect(() => {
    getTeacherGroups();
  }, []);

  useEffect(() => {
    getGroupStudentsWithGrades();
  }, [groupId]);

  useEffect(() => {
    formEdit.resetFields();
    form.resetFields();
  }, [editMarkModalOpen]);

  useEffect(() => {
    setDataDesc(editedMarkData?.description);
    setMarkDesc(editedMarkData?.markValue);
  }, [editMarkModalOpen]);

  function handleCancel() {
    setNewMarkModalOpen(false);
    setEditMarkModalOpen(false);
    setEditedMarkData(undefined);
    formEdit.resetFields();
    form.resetFields();
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {teacherGroups.map((id) => {
          return (
            <button
              onClick={() => setGroupId(id)}
              className={
                id === groupId ? styles.buttonActive : styles.buttonNotActive
              }
            >
              Group {id}
            </button>
          );
        })}
      </div>
      <div className={styles.groupContext}>
        {data.length !== 0 ? (
          data.map((subject) => {
            return (
              <div className={styles.table}>
                <div className={styles.tableHeader}>
                  <div className={styles.headerTitle}>{subject.name}</div>
                </div>
                <Table
                  dataSource={subject.students}
                  pagination={false}
                  loading={subject.students === undefined}
                >
                  <Column
                    title="Name"
                    dataIndex="firstName"
                    key="firstName"
                    width="33%"
                    render={(firstName, data) => {
                      return <div>{data.firstName + " " + data.lastName}</div>;
                    }}
                  />
                  <Column
                    title="Marks"
                    dataIndex="marks"
                    key="marks"
                    width="50%"
                    render={(marks, data) => (
                      <div>
                        {marks.map((mark, idx) => {
                          return (
                            <>
                              <button
                                className={styles.markButton}
                                onClick={() => {
                                  setEditedMarkData(mark);
                                  setEditMarkModalOpen(true);
                                }}
                              >
                                {mark.markValue}
                              </button>
                              {idx < marks.length - 1 ? ", " : ""}
                            </>
                          );
                        })}
                      </div>
                    )}
                  />
                  <Column
                    dataIndex="marks"
                    key="marks"
                    width="16.5%"
                    render={(marks, data) => (
                      <button
                        onClick={() => {
                          setNewMarkModalOpen(true);
                          setStudentInfo({
                            studentId: data.studentId,
                            subjectId: data.marks[0].subjectId,
                          });
                        }}
                        className={styles.tableButton}
                      >
                        Add Mark
                      </button>
                    )}
                  />
                </Table>
              </div>
            );
          })
        ) : (
          <div className={styles.dataNotification}>No data</div>
        )}
      </div>
      <Modal
        title="Add mark"
        cancelText="Cancel"
        okText="Add"
        centered
        okButtonProps={{
          style: { backgroundColor: "#00B8E9", border: 0, borderRadius: 0 },
        }}
        cancelButtonProps={{
          style: { borderRadius: 0 },
        }}
        open={newMarkModalOpen}
        onCancel={handleCancel}
        onOk={form.submit}
      >
        <Form
          form={form}
          onFinish={handleNewMark}
          className={styles.modalFormBox}
        >
          <Form.Item
            name="description"
            className={styles.modalFormInput}
            initialValue=""
          >
            <input
              type="text"
              name="description"
              placeholder="Description"
              defaultValue=""
            />
          </Form.Item>
          <Form.Item
            name="markValue"
            className={styles.modalFormInput}
            initialValue=""
          >
            <input
              type="number"
              min="1"
              max="5"
              name="markValue"
              placeholder="Mark value"
              defaultValue=""
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit mark"
        cancelText="Cancel"
        okText="Edit"
        centered
        okButtonProps={{
          style: { backgroundColor: "#00B8E9", border: 0, borderRadius: 0 },
        }}
        cancelButtonProps={{
          style: { borderRadius: 0 },
        }}
        open={editMarkModalOpen}
        onCancel={handleCancel}
        onOk={formEdit.submit}
      >
        {editedMarkData && (
          <Form
            form={formEdit}
            preserve={false}
            onFinish={handleEditMark}
            className={styles.modalFormBox}
          >
            <Form.Item name="description" className={styles.modalFormInput}>
              <input
                type="text"
                name="description"
                placeholder="Description"
                defaultValue={editedMarkData?.description}
                onChange={(e) => {
                  setDataDesc(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item name="markValue" className={styles.modalFormInput}>
              <input
                type="number"
                min="1"
                max="5"
                name="markValue"
                placeholder="Mark value"
                defaultValue={editedMarkData?.markValue}
                onChange={(e) => {
                  setMarkDesc(e.target.value);
                }}
              />
            </Form.Item>
          </Form>
        )}
        <div className={styles.modalCancel}>
          <button onClick={() => deleteMark()}>Delete</button>
        </div>
      </Modal>
    </div>
  );
}
