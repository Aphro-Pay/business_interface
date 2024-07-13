import React from "react";
import Header from "../../../components/Header";
import { arrowForward } from "ionicons/icons";
import { IonIcon, IonPage } from "@ionic/react";
import styles from "./BusinessHours.module.css";
import Space from "../../../components/Space";
import RoundButton from "../../../components/RoundButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function BusinessHours() {
  const daysOfTheWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const history = useHistory();
  const editHours = () => {
    history.push("/opening_hours");
  };
  return (
    <IonPage>
      <div className="scaffold">
        <Header
          mainText="Business hours"
          subText="Set your business hours and let clients know when you are available. You can always change this later."
        />
        {daysOfTheWeek.map((day, index) => (
          <div className={styles.flexRow} key={index}>
            <div style={{ display: "inline-block" }}>
              <div className={styles.day}>{day}</div>
              <div className={styles.time}>9:00AM - 9:00PM</div>
            </div>
            <Space width="100%"></Space>
            <IonIcon
              icon={arrowForward}
              style={{ fontSize: "40px", color: "#879194" }}
              onClick={editHours}
            ></IonIcon>
          </div>
        ))}
        <RoundButton text="Continue" navigateTo="/your_services" />
      </div>
    </IonPage>
  );
}

export default BusinessHours;
