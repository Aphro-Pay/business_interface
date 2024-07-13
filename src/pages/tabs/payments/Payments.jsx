import { IonPage, IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import React from "react";
import Header from "../../../components/Header";
import styles from "./Payments.module.css";
import Space from "../../../components/Space";
import RoundButton from "../../../components/RoundButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Payments() {
  const history = useHistory();
  const handleDetailsOnClick = () => {
    history.push("/tabs/transaction_details");
  };

  const daysOfTheWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return (
    <IonPage>
      <div className="scaffold">
        <Header type="tabView" mainText="Payments" />
        <div>
          <IonSegment color="light" value="default">
            <IonSegmentButton value="default">
              <IonLabel>Card</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="date">
              <IonLabel>Date</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="treatment">
              <IonLabel>Treatment</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>
        <Space height="20px" />
        {daysOfTheWeek.map((day, index) => (
          <div className={styles.flexRow} key={index}>
            <div style={{ display: "inline-block" }}>
              <div className={styles.day}>{day}</div>
              <div className={styles.time}>N30,000 . Card</div>
            </div>
            <Space width="100%"></Space>
            <RoundButton
              text="Details"
              className={styles.details}
              onClick={handleDetailsOnClick}
            />
          </div>
        ))}
      </div>
    </IonPage>
  );
}

export default Payments;
