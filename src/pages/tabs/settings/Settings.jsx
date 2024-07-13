import { IonPage } from "@ionic/react";
import React from "react";
import Header from "../../../components/Header";
import RoundButton from "../../../components/RoundButton";

function Settings() {
  return (
    <IonPage>
      <div className="scaffold">
        <Header type="tabView" mainText="Settings" />
        <RoundButton text="Log out" />
      </div>
    </IonPage>
  );
}

export default Settings;
