import React from "react";
import "../App.css";
import { useHistory } from "react-router-dom";
import {
  IonButton,
  IonItem,
  IonRouterContext,
  IonRouterLink,
} from "@ionic/react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function RoundButton(prop) {
  const history = useHistory();

  return (
    //<IonNavLink routerDirection="forward" component={() => prop.navigateTo}>
    //<IonButton className="round-button" routerLink="/login"></IonButton>
    <button
      className={"round-button " + prop.className}
      onClick={(e) => {
        prop.onClick != null && prop.onClick();
        prop.navigateTo != null &&
          history.push({ pathname: prop.navigateTo, state: prop.dataToPass });
        e.preventDefault();
      }}
    >
      {prop.text}
    </button>
    //</IonNavLink>
  );
}

export default RoundButton;
