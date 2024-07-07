import React from "react";
import styles from "./EnterMobileNumber.module.css";
import FloatingButton from "../../../components/FloatingButton";
import Input from "../../../components/Input";
import {
  closeOutline,
  arrowBackOutline,
  phonePortraitOutline,
} from "ionicons/icons";
import RoundButton from "../../../components/RoundButton";

function EnterMobileNumber() {
  return (
    <div>
      <div className={styles.scaffold}>
        <div className={styles.header}>
          <FloatingButton
            icon={arrowBackOutline}
            vertical="top"
            horizontal="start"
          />
          <FloatingButton icon={closeOutline} vertical="top" horizontal="end" />
        </div>
        <div className={styles.body}>
          <div
            className={`${styles.phoneNumber} ${styles.content} ${styles.column}`}
          >
            <h2>Enter Mobile Number</h2>
            <Input
              type="number"
              label="Phone Number"
              hintText="(+234) 802 205 1307"
              borderPadding="10px 0px 10px 5px"
              icon={phonePortraitOutline}
              backgroundColor="white"
              className="phoneNumber"
            />
          </div>
        </div>
        <div style={{ padding: "30px" }}>
          <RoundButton text="Send OTP" navigateTo="/verify_otp" />
        </div>
      </div>
    </div>
  );
}

export default EnterMobileNumber;
