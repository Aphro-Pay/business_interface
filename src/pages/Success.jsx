import React from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";
import Space from "../components/Space";

function Success(prop) {
  return (
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
      <div>Done</div>
    </div>
  );
}

export default Success;
