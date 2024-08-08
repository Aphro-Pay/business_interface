import {
  IonPage,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonContent,
} from "@ionic/react";
import React from "react";
import Header from "../../../components/Header";
import ComingSoon from "../../../components/ComingSoon";

function Payments() {
  //const history = useHistory();
  // const handleDetailsOnClick = () => {
  //   history.push("/tabs/payments/transaction_details");
  //};

  // const daysOfTheWeek = [
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  //   "Sunday",
  // ];
  return (
    <IonPage>
      <IonContent>
        <div className="tab-content">
          <Header type="tabView" mainText="Payments" />{" "}
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
          {/*
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
          ))}*/}
          <div
            className="flexColumn"
            style={{ justifyContent: "center", flex: 0.8 }}
          >
            <ComingSoon />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default React.memo(Payments);
