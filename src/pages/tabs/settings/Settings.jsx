import { IonContent, IonIcon, IonPage } from "@ionic/react";
import React, { useContext } from "react";
import Header from "../../../components/Header";
import RoundButton from "../../../components/RoundButton";
import { auth } from "../../../firebase";
import Space from "../../../components/Space";
import Business from "../../../models/Business";
import { BusinessContext } from "../../../providers/BusinessProvider";
import ClickableText from "../../../components/ClickableText";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./Settings.module.css";
import { arrowForward } from "ionicons/icons";

function Settings() {
  const { business, setBusiness } = useContext(BusinessContext);
  const history = useHistory();
  function handleLogOut() {
    localStorage.clear();
    setBusiness(new Business());
    auth.signOut();
  }

  console.log(business?.logo);
  return (
    <IonPage>
      <IonContent>
        <div className="tab-content">
          <Header type="tabView" mainText="Settings" marginTop="0px" />
          <div className="flexRow">
            <div
              style={{
                display: "grid",
                borderRadius: "50%",
                height: "40px",
                width: "40px",
                backgroundColor: "#E8EDF2",
                placeItems: "center",
                //textAlign: "center",
              }}
            >
              <img
                src={
                  business?.logo ?? "../assets/images/default_business_logo.png"
                }
                alt="logo"
                style={{
                  borderRadius: "50%",
                  height: "24px",
                  width: "24px",
                  backgroundColor: "#E8EDF2",
                }}
                onClick={() => {
                  history.push("/tabs/upload_your_logo");
                }}
              ></img>
            </div>
            <Space width="10px" />
            <div className="flexColumn">
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {business?.businessName}
              </span>
              <ClickableText
                text="Edit"
                textDecoration="underline"
                onClick={() => {
                  history.push("/tabs/set_up_your_business_profile");
                }}
              />
            </div>
          </div>
          <Space height="45px" />
          <div className="flexRow">
            <div className={styles.setting}>My opening hours</div>
            <Space flexGrow="1"></Space>
            <IonIcon
              icon={arrowForward}
              style={{ fontSize: "20px", color: "#879194" }}
              onClick={() => {
                history.push("/tabs/business_hours");
              }}
            ></IonIcon>
          </div>
          <Space height="40px" />
          <div className="flexRow">
            <div className={styles.setting}>My services</div>
            <Space flexGrow="1"></Space>
            <IonIcon
              icon={arrowForward}
              style={{ fontSize: "20px", color: "#879194" }}
              onClick={() => {
                history.push("/tabs/your_services");
              }}
            ></IonIcon>
          </div>
          <Space height="40px" />
          <div className="flexRow">
            <div className={styles.setting}>My staff management</div>
            <Space flexGrow="1"></Space>
            <IonIcon
              icon={arrowForward}
              style={{ fontSize: "20px", color: "#879194" }}
              onClick={() => {
                history.push("/tabs/staff_management");
              }}
            ></IonIcon>
          </div>
          <Space height="40px" />
          <div className="flexRow">
            <div className={`${styles.setting} ${styles.disabled}`}>
              Payment settings
            </div>
            <Space flexGrow="1"></Space>
            <IonIcon
              icon={arrowForward}
              style={{ fontSize: "20px", color: "#C4C4C4" }}
              onClick={() => {}}
            ></IonIcon>
          </div>
          <Space height="40px" />
          <div className="flexRow">
            <div className={`${styles.setting} ${styles.disabled}`}>
              Support
            </div>
            <Space flexGrow="1"></Space>
            <IonIcon
              icon={arrowForward}
              style={{ fontSize: "20px", color: "#C4C4C4" }}
              onClick={() => {}}
            ></IonIcon>
          </div>
          <Space height="30px" />
          <RoundButton text="Log out" onClick={handleLogOut} />
        </div>
      </IonContent>
    </IonPage>
  );
}

export default React.memo(Settings);
