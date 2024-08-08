import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { eyeOutline, eyeOffOutline } from "ionicons/icons";
import "../App.css";
import Space from "./Space";

function Input(prop) {
  const [inputType, setInputType] = useState("password");
  const [icon, setIcon] = useState("password");

  function toggleVisibilty() {
    let i = document.getElementById("passwordInput");
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  }

  let suffixIcon =
    inputType == "text" ? (
      <IonIcon
        icon={eyeOffOutline}
        onClick={toggleVisibilty}
        style={{ color: "#007AFF", fontSize: "16px" }}
      ></IonIcon>
    ) : (
      <IonIcon
        icon={eyeOutline}
        onClick={toggleVisibilty}
        style={{ color: "#007AFF" }}
      ></IonIcon>
    );

  return (
    <div className="input">
      <label className="input-label" htmlFor={prop.label}>
        {prop.label}
      </label>
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
        {prop.prefix != null ? <span>{prop.prefix}</span> : null}
        <input
          type={
            prop.name === "password" || prop.name === "confirmedPassword"
              ? inputType
              : prop.type ?? "text"
          }
          placeholder={prop.hintText}
          defaultValue={prop.defaultValue}
          name={prop.name}
          onChange={prop.onChange}
          maxLength={prop.maxLength}
          min={prop.min}
          max={prop.max}
          id={prop.id}
          inputMode={prop.type ?? "text"}
          readOnly={prop.readOnly}
          step="1"
          pattern="\d*"
          //onInput={(this.value = this.value.replace(/[^0-9]/g, ""))}
          style={{
            padding: prop.textPadding,
            width: prop.inputWidth,
            fontSize: prop.fontSize,
            backgroundColor: prop.backgroundColor,
          }}
        ></input>
        {prop.name === "password" || prop.name === "confirmedPassword"
          ? suffixIcon
          : null}
      </div>
    </div>
  );
}

export default Input;
