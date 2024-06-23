import React, { useState } from "react";
import "./SignIn.css";
import RoundButton from "./components/RoundButton";
import Input from "./components/Input";
import ClickableText from "./components/ClickableText";

function SignIn() {
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <div className="scaffold">
      <div className="header">
        <img src="./assets/images/aphro_pay_logo.jpg" alt="logo" />
      </div>
      <div className="body">
        <form className="content">
          <h1 className="text">{isSignIn ? "Sign In" : "Sign Up"}</h1>
          <Input hintText={isSignIn ? "Email" : "Enter Valid Email"} />
          <Input hintText={isSignIn ? "Password" : "Create Password"} />
          {isSignIn ? null : <Input hintText="Confirm Password" />}
          {isSignIn ? <ClickableText text="Forgot Password" /> : null}
          <div className="buttons-container">
            <RoundButton text="ACCEPT" />
            <div className="divider">
              <hr className="divider-line" />
              <span className="divider-text">or</span>
              <hr className="divider-line" />
            </div>
            <RoundButton
              text={isSignIn ? "Sign In With Google" : "Sign Up With Google"}
              className="white"
            />
          </div>
        </form>
      </div>

      <div className="footer text">
        <span>
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
        </span>
        <ClickableText
          text={isSignIn ? "Sign Up" : "Sign In"}
          onClick={() => setIsSignIn(!isSignIn)}
        />
      </div>
    </div>
  );
}

export default SignIn;
