import React from "react";
import "../SignIn.css";

function Input(prop) {
  return <input className="input" placeholder={prop.hintText}></input>;
}

export default Input;
