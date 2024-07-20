import { IonContent, IonFooter, IonPage } from "@ionic/react";
import React from "react";
import Header from "../../../components/Header";
import RoundButton from "../../../components/RoundButton";
import { auth } from "../../../firebase";
import ComingSoon from "../../../components/ComingSoon";
import Space from "../../../components/Space";

function Settings() {
  function handleLogOut() {
    localStorage.clear();
    auth.signOut();
  }
  return (
    <IonPage>
      <IonContent>
        <div className="tab-content">
          <Header type="tabView" mainText="Settings" />
          <ComingSoon />
          <Space height="30px" />
          <RoundButton text="Log out" onClick={handleLogOut} />
        </div>
      </IonContent>
    </IonPage>
  );
}

export default React.memo(Settings);
