import React from "react";
import Header from "../../../components/Header";
import { arrowUp } from "ionicons/icons";
import { IonIcon, IonPage } from "@ionic/react";
import styles from "./UploadYourLogo.module.css";
import RoundButton from "../../../components/RoundButton";
import Space from "../../../components/Space";

function UploadYourLogo() {
  return (
    <IonPage>
      <div className="scaffold">
        <Header
          mainText="Upload your logo"
          subText="Help clients recognise your business. Add a photo of your storefront, logo or team. You can always change this later."
        />
        <div className={styles.uploadImage}>
          <IonIcon
            icon={arrowUp}
            style={{ fontSize: "60px", color: "#879194" }}
          ></IonIcon>
          <div>Upload Image</div>
        </div>
        <Space height="30px" />
        <RoundButton text="Continue" navigateTo="/business_hours" />
      </div>
    </IonPage>
  );
}

export default UploadYourLogo;
