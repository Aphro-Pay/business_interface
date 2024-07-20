import React from "react";
import "../App.css";
import {
  IonButton,
  IonItem,
  IonNavLink,
  IonRouterContext,
  IonRouterLink,
} from "@ionic/react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SetUpYourBusinessProfile from "../pages/onboarding/set_up_your_business_profile/SetUpYourBusinessProfile";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function RoundButton(prop) {
  const history = useHistory();

  return (
    //<Link to={"/create_your_login_details"}>
    <button
      className={"round-button " + prop.className}
      onClick={(e) => {
        prop.onClick != null && prop.onClick();
        prop.navigateTo != null &&
          history.push(prop.navigateTo, prop.dataToPass);
        e.preventDefault();
      }}
    >
      {prop.text}
    </button>
    //</Link>
  );
}

export default RoundButton;
