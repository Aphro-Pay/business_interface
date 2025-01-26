import React from "react";
import { IonIcon } from "@ionic/react";
import { callOutline } from "ionicons/icons";
import styles from "./AppointmentCard.module.css";

const AppointmentCard = ({ time, client, treatment, staff, index, total }) => {
  const renderDots = () => {
    return Array(total)
      .fill()
      .map((_, i) => (
        <div
          key={i}
          className={`${styles.dot} ${i === index ? styles.activeDot : ""}`}
        />
      ));
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.timeContainer}>
          <span className={styles.time}>{time}</span>
          <span className={styles.period}>AM</span>
        </div>
        <div className={styles.details}>
          <div className={styles.row}>Client: {client}</div>
          <div className={styles.row}>Treatment: {treatment}</div>
          <div className={styles.row}>Staff: {staff}</div>
        </div>
      </div>

      <div className={styles.actions}>
        <div className={styles.actionColumn}>
          <IonIcon icon={callOutline} className={styles.icon} />
          <div className={styles.dots}>{renderDots()}</div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
