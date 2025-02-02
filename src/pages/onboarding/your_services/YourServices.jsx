import React, { useContext, useEffect, useCallback } from "react";
import { IonIcon, IonPage } from "@ionic/react";
import Header from "../../../components/Header";
import styles from "./YourServices.module.css";
import Space from "../../../components/Space";
import RoundButton from "../../../components/RoundButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BusinessContext } from "../../../providers/BusinessProvider";
import { add, closeOutline } from "ionicons/icons";
import { AuthContext } from "../../../providers/AuthProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

function YourServices() {
  const { business, setBusiness } = useContext(BusinessContext);
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const services = business.getInfo().services;

  const updateDB = useCallback(async () => {
    try {
      const docRef = doc(db, "businesses", user.uid);
      await updateDoc(docRef, {
        services: services,
      });
    } catch (error) {
      alert("Failed to update services.");
    }
  }, [user, services]);

  useEffect(() => {
    if (user) {
      updateDB();
    }
  }, [user, updateDB]);

  const addService = () => {
    user ? history.replace("/tabs/add_service") : history.push("/add_service");
  };

  const dataToPass = {
    mainText: "Onboarding complete!",
  };

  return (
    <IonPage>
      <div className={styles.scaffold}>
        <Header
          mainText="Your Services"
          subText="Include the price list for your treatments below. You can always change this later."
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
        <div>
          {services.map(({ service, duration }, index) => (
            <div className={styles.flexColumn} key={index}>
              <div className={styles.flexRow}>
                <div style={{ display: "inline-block" }}>
                  <div className={styles.day}>{service}</div>
                  <div className={styles.time}>
                    {duration.hours + " hours "}
                    {duration.minutes + " minutes"}
                  </div>
                </div>
                <Space width="100%"></Space>
                <div style={{ textAlign: "right" }}>
                  <IonIcon
                    icon={closeOutline}
                    onClick={async () => {
                      services.splice(index, 1);
                      setBusiness(business.clone());
                      if (user) {
                        updateDB();
                      }
                    }}
                  ></IonIcon>
                </div>
              </div>{" "}
              <Space height="25px"></Space>
            </div>
          ))}

          <div className={styles.addService}>
            Add Service <Space width="100%" />
            <IonIcon
              icon={add}
              style={{ fontSize: "30px", color: "#879194" }}
              onClick={addService}
            ></IonIcon>
          </div>
          <Space height="25px"></Space>
          <RoundButton
            text="Continue"
            dataToPass={dataToPass}
            onClick={() => {
              user
                ? history.replace("/tabs/settings")
                : history.push("/success/onboarding_complete");
            }}
          />
        </div>
      </div>
    </IonPage>
  );
}

export default React.memo(YourServices);
