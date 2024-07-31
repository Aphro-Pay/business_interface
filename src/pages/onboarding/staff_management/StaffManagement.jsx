import React, { useContext } from "react";
import { add } from "ionicons/icons";
import { IonIcon, IonPage } from "@ionic/react";
import Header from "../../../components/Header";
import styles from "./StaffManagement.module.css";
import Space from "../../../components/Space";
import RoundButton from "../../../components/RoundButton";
import { Route, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { IonRouterOutlet } from "@ionic/react";
import AddStaffName from "./AddStaffName";
import { BusinessContext } from "../../../providers/BusinessProvider";
import { closeOutline } from "ionicons/icons";

function StaffManagement() {
  const { business, setBusiness } = useContext(BusinessContext);
  const history = useHistory();

  const staff = business.getInfo().staff;
  console.log(staff);

  const addStaffName = () => history.push("/add_staff_name");

  return (
    <IonPage>
      <div className="scaffold">
        <Header
          mainText="Staff management"
          subText="Add the names of the different professionals at your establishment. You can always change these later."
        />
        {staff.map((name, index) => (
          <div key={index}>
            <div className={styles.flexRow}>
              <div style={{ display: "inline-block" }}>
                <div className={styles.staffName}>{name}</div>
              </div>
              <Space flexGrow="1"></Space>
              <IonIcon
                icon={closeOutline}
                onClick={() => {
                  staff.splice(index, 1);
                  setBusiness(business.clone());
                }}
              ></IonIcon>
            </div>

            <Space height="25px"></Space>
          </div>
        ))}
        <div className={styles.addService}>
          Add Professional <Space width="100%" />
          <IonIcon
            icon={add}
            style={{ fontSize: "30px", color: "#879194" }}
            onClick={addStaffName}
          ></IonIcon>
        </div>
        <Space height="25px"></Space>
        <RoundButton
          text="Continue"
          navigateTo="/your_services"
          //dataToPass={dataToPass}
        />
      </div>
    </IonPage>
  );
}

export default React.memo(StaffManagement);
