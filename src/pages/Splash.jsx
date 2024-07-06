import React from "react";
import RoundButton from "../components/RoundButton";
import Space from "../components/Space";
import styles from "./Splash.module.css";

function Splash() {
  return (
    <div className={styles.scaffold}>
      <div className={styles.body}>
        <div className={styles.content}>
          <img
            src="./assets/images/aphro_pay_logo.jpg"
            alt="logo"
            width="80%"
          />
          <RoundButton text="Log in" navigateTo="/login" />
          <Space height="16px" />
          <RoundButton text="Sign up" className="grey" />
        </div>
      </div>
    </div>
  );
}

export default Splash;
