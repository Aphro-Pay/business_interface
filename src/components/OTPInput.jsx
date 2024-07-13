import React from "react";
import Input from "./Input";

function OTPInput(prop) {
  return (
    <Input
      type="text"
      hintText="0"
      borderPadding="10px"
      inputWidth="18px"
      backgroundColor="white"
      className="otp phoneNumber"
      fontSize="15px"
      min="0"
      max="9"
      onChange={prop.onChange}
      id={prop.id}
      maxLength={prop.maxLength}
    />
  );
}

export default OTPInput;
