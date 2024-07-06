import React from "react";
import { IonIcon } from "@ionic/react";
import "../App.css";
import Space from "./Space";

function Input(prop) {
  return (
    <div className="input">
      <label className="input-label">{prop.label}</label>
      <Space height="5px" />
      <div
        className={"input-border " + prop.className}
        style={{
          padding: prop.borderPadding,
          backgroundColor: prop.backgroundColor,
        }}
      >
        {prop.icon != null ? <IonIcon icon={prop.icon}></IonIcon> : null}
        <Space width="5px" />
        <input
          type={prop.type}
          placeholder={prop.hintText}
          style={{
            padding: prop.textPadding,
            width: prop.inputWidth,
            fontSize: prop.fontSize,
            backgroundColor: prop.backgroundColor,
          }}
        ></input>
      </div>
    </div>
  );
}

export default Input;
