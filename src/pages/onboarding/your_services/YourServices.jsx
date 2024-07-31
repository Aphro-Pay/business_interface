import React, { useContext } from "react";
import { add } from "ionicons/icons";
import { IonIcon, IonPage } from "@ionic/react";
import Header from "../../../components/Header";
import styles from "./YourServices.module.css";
import Space from "../../../components/Space";
import RoundButton from "../../../components/RoundButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BusinessContext } from "../../../providers/BusinessProvider";
import { Business, getInfo } from "../../../models/Business";
import { duration } from "moment";
import { closeOutline } from "ionicons/icons";

function YourServices() {
  const { business, setBusiness } = useContext(BusinessContext);
  const history = useHistory();
  const addService = () => history.push("/add_service");

  const dataToPass = {
    mainText: "Onboarding complete!",
  };

  const services = business.getInfo().services;
  console.log(services);

  return (
    <IonPage>
      <div className="scaffold">
        <Header
          mainText="Your Services"
          subText="Include the price list for your treatments below. You can always change this later."
        />
        <div>
          {services.map(({ service, price, duration, notes }, index) => (
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
                    onClick={() => {
                      services.splice(index, 1);
                      setBusiness(business.clone());
                    }}
                  ></IonIcon>
                  <div>&#8358;{price}</div>
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
            navigateTo="/success/onboarding_complete"
            //navigateTo="/success/onboarding_complete"
            dataToPass={dataToPass}
          />
        </div>
      </div>
    </IonPage>
  );
}

export default React.memo(YourServices);
