import React from "react";
import "../App.css";
import { useHistory } from "react-router-dom";
import { IonButton } from "@ionic/react";

function RoundButton(prop) {
  const history = useHistory();

  return (
    //<IonButton className="round-button" routerLink="/login"></IonButton>
    <button
      className={"round-button " + prop.className}
      onClick={() => {
        history.push(prop.navigateTo);
      }}
    >
      {prop.text}
    </button>
  );
}

export default RoundButton;
