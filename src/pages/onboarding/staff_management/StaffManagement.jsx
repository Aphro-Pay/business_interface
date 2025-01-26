import React, { useContext, useEffect } from "react";
import { IonPage, IonIcon } from "@ionic/react";
import Header from "../../../components/Header";
import styles from "./StaffManagement.module.css";
import Space from "../../../components/Space";
import RoundButton from "../../../components/RoundButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BusinessContext } from "../../../providers/BusinessProvider";
import { closeOutline, add } from "ionicons/icons";
import { AuthContext } from "../../../providers/AuthProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

function StaffManagement() {
  const { business, setBusiness } = useContext(BusinessContext);
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const staff = business.getInfo().staff;

  const addStaffName = () => {
    user
      ? history.replace("/tabs/add_staff_name")
      : history.push("/add_staff_name");
  };

  useEffect(() => {
    if (user) {
      async function updateDB() {
        try {
          const docRef = doc(db, "businesses", user.uid); // Replace 'collectionName' with your collection name
          await updateDoc(docRef, {
            staff: staff,
          });
        } catch (error) {
          console.error("Error updating staff: ", error);
          alert("Failed to update staff.");
        }
      }
      updateDB();
    }
  }, [staff, user]);

  return (
    <IonPage>
      <div className={styles.scaffold}>
        <Header
          mainText="Staff management"
          subText="Add the names of the different professionals at your establishment. You can always change these later."
          type={user ? "tabView" : null}
          enableBackButton={user ? "y" : null}
          goBack={
            user
              ? () => {
                  history.replace("/tabs/settings");
                }
              : null
          }
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
                onClick={async () => {
                  staff.splice(index, 1);
                  setBusiness(business.clone());

                  if (user) {
                    try {
                      const docRef = doc(db, "businesses", user.uid); // Replace 'collectionName' with your collection name
                      await updateDoc(docRef, {
                        staff: staff,
                      });
                    } catch (error) {
                      console.error("Error updating staff: ", error);
                      alert("Failed to update staff.");
                    }
                  }
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
          onClick={() => {
            user
              ? history.replace("/tabs/settings")
              : history.push("/your_services");
          }}
          //dataToPass={dataToPass}
        />
      </div>
    </IonPage>
  );
}

export default React.memo(StaffManagement);
