import React from "react";
import EnterMobileNumber from "../enter_mobile_number/EnterMobileNumber";
import FloatingButton from "../../../components/FloatingButton";
import Input from "../../../components/Input";
import {
  closeOutline,
  arrowBackOutline,
  phonePortraitOutline,
} from "ionicons/icons";
import RoundButton from "../../../components/RoundButton";
import OTPInput from "../../../components/OTPInput";
import Space from "../../../components/Space";
import ClickableText from "../../../components/ClickableText";
import styles from "../enter_mobile_number/EnterMobileNumber.module.css";
import { IonPage } from "@ionic/react";

function VerifyOTP() {
  const dataToPass = {
    mainText: "Done",
  };

  return (
    <IonPage>
      <div>
        <div className={styles.scaffold}>
          <div className={styles.header}>
            <FloatingButton
              icon={arrowBackOutline}
              vertical="top"
              horizontal="start"
            />
            <FloatingButton
              icon={closeOutline}
              vertical="top"
              horizontal="end"
            />
          </div>
          <div className={styles.body}>
            <div className={`${styles.content} ${styles.column}`}>
              <h2>Verify OTP</h2>
              <div
                className={`${styles.content} ${styles.row}`}
                style={{ justifyContent: "center" }}
              >
                {[...Array(4)].map((x, i) => (
                  <div key={i} style={{ margin: "0px 5px 0px 5px" }}>
                    <OTPInput />
                  </div>
                ))}
              </div>
              <div className={`${styles.content} ${styles.row}`}>
                <span>Didn't Recieve the Code?</span>
                <Space width="5px" />
                <ClickableText text="Resend" />
              </div>
            </div>
          </div>
          <div style={{ padding: "30px" }}>
            <RoundButton text="Verify OTP" navigateTo="/success/done" />
          </div>
        </div>
      </div>
    </IonPage>
  );
}

export default VerifyOTP;
