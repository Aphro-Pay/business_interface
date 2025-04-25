import React, { useState } from "react";
import styles from "./LogIn.module.css";
import "../../../App.css";
import RoundButton from "../../../components/RoundButton";
import Input from "../../../components/Input";
import ClickableText from "../../../components/ClickableText";
import Space from "../../../components/Space";
import { IonPage, IonContent, IonAlert } from "@ionic/react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { useHistory } from "react-router-dom";
import Header from "../../../components/Header";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  async function SignIn() {
    if (!email || !password) {
      setErrorMessage("Please enter both email and password");
      setShowError(true);
      return;
    }

    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("businessId", user.uid);
        history.push("/tabs/home");
      })
      .catch((error) => {
        let message = "An error occurred during login. Please try again.";

        console.log(error.code);

        switch (error.code) {
          case "auth/invalid-credential":
            message = "Invalid email or password.";
            break;
          case "auth/user-disabled":
            message = "This account has been disabled.";
            break;
          case "auth/user-not-found":
            message = "No account found with this email.";
            break;
          case "auth/wrong-password":
            message = "Incorrect password.";
            break;
          case "auth/too-many-requests":
            message = "Too many failed attempts. Please try again later.";
            break;
          case "auth/network-request-failed":
            message = "Network error. Please check your connection.";
            break;
        }

        setErrorMessage(message);
        setShowError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <IonPage>
      <IonContent>
        <IonAlert
          isOpen={showError}
          onDidDismiss={() => setShowError(false)}
          header="Login Error"
          message={errorMessage}
          buttons={["OK"]}
        />
        <div className={styles.scaffold}>
          <Header enableBackButton="n" />
          <div className={styles.title}>Log in to your account</div>
          <Space height="50px" />
          <div className={styles.body}>
            <form className={`${styles.column} ${styles.content}`}>
              <Input
                hintText="john.doe@gmail.com"
                label="Email"
                onChange={handleEmailChange}
              />
              <Space height="15px" />
              <Input
                hintText="********"
                label="Password"
                onChange={handlePasswordChange}
              />
              <ClickableText
                text="Forgot Password?"
                onClick={async () => {
                  if (email === "") {
                    alert("Please enter your email");
                  } else {
                    await sendPasswordResetEmail(auth, email);
                    alert("Please check your inbox to reset your password");
                  }
                }}
              />
              <Space height="15px" />
              <RoundButton
                text={isLoading ? "Logging in..." : "Log in"}
                onClick={SignIn}
                disabled={isLoading}
                style={{
                  opacity: isLoading ? 0.7 : 1,
                  backgroundColor: isLoading ? "#808080" : undefined,
                }}
              />
            </form>
            <Space height="15px" />
            <div className={`${styles.row} ${styles.content}`}>
              <span>Don't have an account?</span>
              <Space width="5px" />
              <ClickableText
                text="Sign Up"
                textDecoration="underline"
                onClick={() => {
                  history.push("/create_your_login_details");
                }}
              />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default LogIn;
