import React from "react";
import styles from "../pages/authentication/verify_otp/VerifyOTP.module.css";
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
