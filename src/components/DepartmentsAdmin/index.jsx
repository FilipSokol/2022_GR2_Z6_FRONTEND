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

  const [dataName, setDataName] = useState(null);
  const [dataAddress, setDataAddress] = useState(null);
  const [dataCity, setDataCity] = useState(null);
  const [dataPostal, setDataPostal] = useState(null);

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
            message: "Add new department.",
          });
        } else {
          notification.error({
            message: "Error while adding a new department.",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: "Error while adding a new department.",
        });
      });
  }

  async function editDepartment(departmentId) {
    await axios
      .put(`http://localhost:5000/api/departments/${departmentId}`, {
        name: dataName,
        address: dataAddress,
        city: dataCity,
        postalCode: dataPostal,
      })
      .then((response) => {
        if (response.status) {
          setEditedDepartmentData(null);
          getDepartmentsData();
          handleCancel();
          notification.success({
            message: "Eddited department information.",
          });
        } else {
          setEditedDepartmentData(null);
          notification.error({
            message: "Error while editing department information.",
          });
        }
      })
      .catch((error) => {
        setEditedDepartmentData(null);
        console.log(error);
        notification.error({
          message: "Error while editing department information.",
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
            message: "Deleted deparment successful.",
          });
        } else {
          notification.error({
            message: "Error while deleting department.",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: "Error while deleting department.",
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
            message: "Deleted group successful.",
          });
        } else {
          notification.error({
            message: "Error while deleting department.",
          });
        }
      })
      .catch(() => {
        notification.error({
          message: "Error while deleting group.",
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
        message: "Fill all fields.",
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

  function handleEditDepartment() {
    console.log(dataCity);
    if (
      dataName === "" ||
      dataAddress === "" ||
      dataCity === "" ||
      dataPostal === ""
    ) {
      notification.error({
        message: "Fill all fields.",
      });
    } else {
      editDepartment(editedDepartmentData.departmentId);
    }
  }

  function handleCancel() {
    setEditedDepartmentData(null);
    form.resetFields();
    setEditDepartmentModalOpen(false);
    setAddDepartmentModalOpen(false);
  }

  useEffect(() => {
    formEdit.resetFields();
    form.resetFields();
  }, [editDepartmentModalOpen]);

  useEffect(() => {
    setDataName(editedDepartmentData?.name);
    setDataAddress(editedDepartmentData?.address);
    setDataCity(editedDepartmentData?.city);
    setDataPostal(editedDepartmentData?.postalCode);
  }, [editDepartmentModalOpen]);

  return (
    <div className={styles.container}>
      <div className={styles.tableBox}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.headerTitle}>Department</div>
            <div className={styles.headerButton}>
              <button
                onClick={() => {
                  setAddDepartmentModalOpen(true);
                }}
                className={styles.tableHeaderButton}
              >
                New Department
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
            <Column title="Name" dataIndex="name" key="name" width="16.6%" />
            <Column title="City" dataIndex="city" key="city" width="16.6%" />
            <Column
              title="Address"
              dataIndex="address"
              key="address"
              width="16.6%"
            />
            <Column
              title="PostalCode"
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
                  Show Groups
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
                  Edit
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
            Are you sure you want to delete the department?
          </div>
        </div>
      </Modal>
      <Modal
        title="Groups assigned to a department"
        centered
        open={groupModalOpen}
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
            >
              <Column
                title="Id"
                width="10%"
                render={(value, item, index) => index + 1}
              />
              <Column title="Name" dataIndex="name" key="name" width="20%" />
              <Column
                width="10%"
                render={(data) => (
                  <button
                    onClick={() => {
                      getDeleteGroup(data.departmentId, data.groupId);
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
      </Modal>
      <Modal
        title="Add new department"
        centered
        okButtonProps={{
          style: { backgroundColor: "#00B8E9", border: 0, borderRadius: 0 },
        }}
        cancelButtonProps={{
          style: { borderRadius: 0 },
        }}
        open={addDepartmentModalOpen}
        onCancel={handleCancel}
        onOk={form.submit}
      >
        <Form
          form={form}
          onFinish={handleNewDepartment}
          className={styles.modalFormBox}
        >
          <Form.Item name="name" className={styles.modalFormInput}>
            <input type="text" name="name" placeholder="Name" />
          </Form.Item>
          <Form.Item name="address" className={styles.modalFormInput}>
            <input type="text" name="address" placeholder="Address" />
          </Form.Item>
          <Form.Item name="city" className={styles.modalFormInput}>
            <input type="text" name="city" placeholder="City" />
          </Form.Item>
          <Form.Item name="postalCode" className={styles.modalFormInput}>
            <input type="text" name="postalCode" placeholder="PostalCode" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit department"
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
          <Form.Item name="name" className={styles.modalFormInput}>
            <input
              type="text"
              name="name"
              defaultValue={editedDepartmentData?.name}
              onChange={(e) => {
                setDataName(e.target.value);
              }}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item name="address" className={styles.modalFormInput}>
            <input
              type="text"
              name="address"
              defaultValue={editedDepartmentData?.address}
              onChange={(e) => {
                setDataAddress(e.target.value);
              }}
              placeholder="Address"
            />
          </Form.Item>
          <Form.Item name="city" className={styles.modalFormInput}>
            <input
              type="text"
              name="city"
              defaultValue={editedDepartmentData?.city}
              onChange={(e) => {
                setDataCity(e.target.value);
              }}
              placeholder="City"
            />
          </Form.Item>
          <Form.Item name="postalCode" className={styles.modalFormInput}>
            <input
              type="text"
              name="postalCode"
              defaultValue={editedDepartmentData?.postalCode}
              onChange={(e) => {
                setDataPostal(e.target.value);
              }}
              placeholder="PostalCode"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
