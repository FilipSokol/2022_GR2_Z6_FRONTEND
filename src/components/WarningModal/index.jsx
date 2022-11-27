import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import styles from "./WarningModal.module.scss";

export default function WarningModal(
  title,
  warningText,
  warningModalOpen,
  setWarningModalOpen
) {
  return (
    <Modal
      title={title}
      cancelText="Anuluj"
      centered
      visible={warningModalOpen}
      onCancel={() => {
        setWarningModalOpen(false);
      }}
    >
      <div className={styles.modalBox}>
        <div className={styles.modalWarningText}>{warningText}</div>
      </div>
    </Modal>
  );
}
