import React from "react";
import RoundButton from "../components/RoundButton";
import Space from "../components/Space";
import styles from "./Splash.module.css";
import { IonPage, IonContent } from "@ionic/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Splash() {
  const history = useHistory();

  const handleTestLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, "test@aphropay.com", "Passw0rd!")
        .then((userCredential) => {
          const user = userCredential.user;
          localStorage.setItem("businessId", user.uid);
          history.push("/tabs/home");
        })
        .catch((error) => {
          console.error("Test login error:", error);
        });
    } catch (error) {
      console.error("Test login error:", error);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="scaffold">
          <div className={styles.body}>
            <div className={styles.content}>
              <img
                src="./assets/images/aphro_pay_logo.jpg"
                alt="logo"
                className={styles.img}
              />
              <Space height="16px" />
              <RoundButton text="Log in" navigateTo="/login" />
              <Space height="16px" />
              <RoundButton
                text="Sign up"
                className="grey"
                navigateTo="/create_your_login_details"
              />
              <Space height="16px" />
              <RoundButton
                text="Test"
                style={{ backgroundColor: "black", color: "white" }}
                onClick={handleTestLogin}
              />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Splash;
