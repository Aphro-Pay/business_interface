import { IonPage, IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import React from "react";
import Header from "../../../components/Header";
import { addOutline } from "ionicons/icons";
import styles from "./Bookings.module.css";
import Space from "../../../components/Space";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Bookings() {
  const history = useHistory();
  const addBooking = () => {
    history.push("/add_booking");
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
        <Header
          mainText="Bookings"
          type="tabView"
          enableIcon="y"
          icon={addOutline}
          onClick={addBooking}
        />
        <div>
          <IonSegment color="light" value="default">
            <IonSegmentButton value="default">
              <IonLabel>Status</IonLabel>
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
              <div className={styles.time}>Manicure . Bukola</div>
              <div className={styles.time}>Ice Prince . 08033019874</div>
            </div>
            <Space width="100%"></Space>
            <h4 style={{ fontWeight: "500" }}>Past</h4>
          </div>
        ))}
      </div>
    </IonPage>
  );
}

export default Bookings;
