import React, { useState } from "react";
import styles from "./LogIn.module.css";
import "../../../App.css";
import RoundButton from "../../../components/RoundButton";
import Input from "../../../components/Input";
import ClickableText from "../../../components/ClickableText";
import Space from "../../../components/Space";
import FloatingButton from "../../../components/FloatingButton";
import { closeOutline } from "ionicons/icons";
import { IonPage } from "@ionic/react";

function LogIn() {
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <IonPage>
      <div className={styles.scaffold}>
        <div className={styles.header}>
          <div className={styles.title}>Log in to your account</div>
          <FloatingButton icon={closeOutline} vertical="top" horizontal="end" />
        </div>
        <div className={styles.body}>
          <form className={`${styles.column} ${styles.content}`}>
            <Input hintText="john.doe@gmail.com" label="Email or Username" />
            <Space height="15px" />
            <Input hintText="********" label="Password" />
            <ClickableText text="Forgot Password?" />
            <Space height="15px" />
            <RoundButton
              text="Log in"
              onClick="/login"
              navigateTo="/enter_mobile_number"
            />
          </form>
          <Space height="15px" />
          <div className={`${styles.row} ${styles.content}`}>
            <span>Don't have an account?</span>
            <Space width="5px" />
            <ClickableText
              text="Sign Up"
              textDecoration="underline"
              onClick={() => setIsSignIn(!isSignIn)}
            />
          </div>
        </div>
      </div>
    </IonPage>
  );
}

export default LogIn;
