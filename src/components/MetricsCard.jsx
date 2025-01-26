import React from "react";
import { IonIcon } from "@ionic/react";
import { arrowUpOutline, arrowDownOutline } from "ionicons/icons";
import styles from "./MetricsCard.module.css";

const MetricsCard = ({ value, label, period, percentage, isPositive }) => {
  return (
    <div className={styles.card}>
      <div
        className={`${styles.indicator} ${
          isPositive ? styles.positive : styles.negative
        }`}
      >
        <IonIcon icon={isPositive ? arrowUpOutline : arrowDownOutline} />
      </div>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>
        {label}
        <br />({period})
      </div>
      <div
        className={`${styles.percentage} ${
          isPositive ? styles.positive : styles.negative
        }`}
      >
        {isPositive ? "+" : ""}
        {percentage}%
      </div>
    </div>
  );
};

export default MetricsCard;
