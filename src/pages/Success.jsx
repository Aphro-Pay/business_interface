import React from "react";
import { IonFab, IonFabButton, IonIcon, IonPage } from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";
import { useParams } from "react-router-dom";
import Space from "../components/Space";

function Success(prop) {
  const { state } = useParams();
  console.log(state);
  return (
    <IonPage>
      <div
        style={{
          display: "flex",
          flex: "1",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <IonIcon
          icon={checkmarkCircle}
          style={{ fontSize: "60px", color: "#004096" }}
        ></IonIcon>
        <Space height="5px" />
        <div>{state == "done" ? "Done" : "Onboarding Complete"}</div>
        <Space height="10px"></Space>
        <div>
          {state == "done"
            ? ""
            : "You will be redirected to your Home Screen shortly"}
        </div>
      </div>
    </IonPage>
  );
}

export default Success;
