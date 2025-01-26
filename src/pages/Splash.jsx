import React from "react";
import RoundButton from "../components/RoundButton";
import Space from "../components/Space";
import styles from "./Splash.module.css";
import { IonPage, IonContent } from "@ionic/react";

function Splash() {
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
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Splash;
