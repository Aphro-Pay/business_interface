import React from "react";
import { add } from "ionicons/icons";
import { IonIcon, IonPage } from "@ionic/react";
import Header from "../../../components/Header";
import styles from "./StaffManagement.module.css";
import Space from "../../../components/Space";
import RoundButton from "../../../components/RoundButton";
import { Route, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { IonRouterOutlet } from "@ionic/react";
import AddStaffName from "./AddStaffName";

function StaffManagement() {
  const history = useHistory();

  const addStaffName = () => history.push("/add_staff_name");
  return (
    <IonPage>
      <div className="scaffold">
        <Header
          mainText="Staff management"
          subText="Add the names of the different professionals at your establishment. You can always change these later."
        />
        <div className={styles.addService}>
          Add Professional <Space width="100%" />
          <IonIcon
            icon={add}
            style={{ fontSize: "30px", color: "#879194" }}
            onClick={addStaffName}
          ></IonIcon>
        </div>
        <RoundButton
          text="Continue"
          navigateTo="/success/onboarding_complete"
          //dataToPass={dataToPass}
        />
      </div>
    </IonPage>
  );
}

export default StaffManagement;
