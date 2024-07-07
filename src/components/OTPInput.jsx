import React from "react";
import Input from "./Input";

function OTPInput() {
  return (
    <Input
      type="number"
      hintText="0"
      borderPadding="10px"
      inputWidth="28px"
      backgroundColor="white"
      className="otp phoneNumber"
      fontSize="30px"
    />
  );
}

export default OTPInput;
