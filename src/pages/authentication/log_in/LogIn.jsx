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
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { useHistory } from "react-router-dom";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  async function SignIn() {
    //const res = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(auth.currentUser);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        history.push("/enter_mobile_number");

        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <IonPage>
      <div className={styles.scaffold}>
        <div className={styles.header}>
          <div className={styles.title}>Log in to your account</div>
          <FloatingButton icon={closeOutline} vertical="top" horizontal="end" />
        </div>
        <div className={styles.body}>
          <form className={`${styles.column} ${styles.content}`}>
            <Input
              hintText="john.doe@gmail.com"
              label="Email or Username"
              onChange={handleEmailChange}
            />
            <Space height="15px" />
            <Input
              hintText="********"
              label="Password"
              onChange={handlePasswordChange}
            />
            <ClickableText text="Forgot Password?" />
            <Space height="15px" />
            <RoundButton
              text="Log in"
              onClick={SignIn}
              //navigateTo="/enter_mobile_number"
            />
          </form>
          <Space height="15px" />
          <div className={`${styles.row} ${styles.content}`}>
            <span>Don't have an account?</span>
            <Space width="5px" />
            <ClickableText
              text="Sign Up"
              textDecoration="underline"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </IonPage>
  );
}

export default LogIn;
