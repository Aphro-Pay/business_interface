import React, { useContext, useEffect, useState } from "react";
import Header from "../../../components/Header";
import { arrowForward } from "ionicons/icons";
import { IonIcon, IonPage } from "@ionic/react";
import styles from "./BusinessHours.module.css";
import Space from "../../../components/Space";
import RoundButton from "../../../components/RoundButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BusinessContext } from "../../../providers/BusinessProvider";

function BusinessHours() {
  const { business, setBusiness } = useContext(BusinessContext);
  const history = useHistory();

  // const daysOfTheWeek = [
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  //   "Sunday",
  // ];

  const businessHours = business.getInfo().businessHours;

  useEffect(() => {});

  const editHours = (e) => {
    history.push(`/opening_hours/${e.target.id}`);
  };
  return (
    <IonPage>
      <div className="scaffold">
        <Header
          mainText="Business hours"
          subText="Set your business hours and let clients know when you are available. You can always change this later."
        />
        {Object.entries(businessHours).map(([day, hours]) => (
          <div className={styles.flexRow} key={day}>
            <div style={{ display: "inline-block" }}>
              <div className={styles.day}>{day}</div>
              {hours.Status === "Open" ? (
                <div className={styles.time}>
                  {hours.Open} - {hours.Close}
                </div>
              ) : (
                <div className={styles.time}>{hours.Status}</div>
              )}
            </div>

            <Space width="100%"></Space>
            <IonIcon
              id={day}
              icon={arrowForward}
              style={{ fontSize: "40px", color: "#879194" }}
              onClick={editHours}
            ></IonIcon>
          </div>
        ))}
        <RoundButton text="Continue" navigateTo="/staff_management" />
      </div>
    </IonPage>
  );
}

export default BusinessHours;
