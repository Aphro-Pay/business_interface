import React from "react";
import { add } from "ionicons/icons";
import { IonIcon, IonPage } from "@ionic/react";
import Header from "../../../components/Header";
import styles from "./YourServices.module.css";
import Space from "../../../components/Space";
import RoundButton from "../../../components/RoundButton";

function YourServices() {
  const dataToPass = {
    mainText: "Onboarding complete!",
  };
  return (
    <IonPage>
      <div className="scaffold">
        <Header
          mainText="Your Services"
          subText="Include the price list for your treatments below. You can always change this later."
        />
        <div className={styles.addService}>
          Add Service <Space width="100%" />
          <IonIcon
            icon={add}
            style={{ fontSize: "30px", color: "#879194" }}
          ></IonIcon>
        </div>
        <RoundButton
          text="Continue"
          navigateTo="/staff_management"
          //navigateTo="/success/onboarding_complete"
          dataToPass={dataToPass}
        />
      </div>
    </IonPage>
  );
}

export default YourServices;
