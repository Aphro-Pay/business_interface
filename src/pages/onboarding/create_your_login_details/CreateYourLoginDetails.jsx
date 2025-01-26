import React, { useContext, useState } from "react";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import RoundButton from "../../../components/RoundButton";
import Space from "../../../components/Space";
import { IonPage, IonContent } from "@ionic/react";
import { BusinessContext } from "../../../providers/BusinessProvider";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./CreateYourLoginDetails.module.css";

function CreateYourLoginDetails() {
  const { business, setBusiness } = useContext(BusinessContext);
  const [password, setPassword] = useState();
  const history = useHistory();
  const [confirmedPassword, setConfirmedPassword] = useState();
  const [requirements, setRequirements] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });

  function handleOnClickContinue(event) {
    let email = document.getElementById("email").value;
    if (validateInput()) {
      localStorage.setItem("password", password);
      business.updateEmail(email);
      setBusiness(business.clone());
      history.push("/set_up_your_business_profile");
    }
  }

  function validateInput() {
    let email = document.getElementById("email").value;

    if (!email.match(/\S+@\S+\.\S+/)) {
      alert("Please enter a valid email");
      return false;
    }

    if (password === null || password !== confirmedPassword) {
      alert("Please reconfirm your password");
      return false;
    }

    if (password.length < 8) {
      alert("Your password needs a minimum of 8 characters");
      return false;
    }

    if (password.search(/[a-z]/) < 0) {
      alert("Your password needs a lower case letter");
      return false;
    }
    if (password.search(/[A-Z]/) < 0) {
      alert("Your password needs an upper case letter");
      return false;
    }
    if (password.search(/[0-9]/) < 0) {
      alert("Your password needs a number");
      return false;
    }
    if (password.search(/[! @ # $ %]/) < 0) {
      alert("Your password needs a special character");
      return false;
    }

    return true;
  }

  function handlePasswordChange(event) {
    const { value, name } = event.target;

    if (name === "password") {
      setPassword(value);
      // Check password requirements
      setRequirements({
        length: value.length >= 8 && value.length <= 32,
        lowercase: /[a-z]/.test(value),
        uppercase: /[A-Z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[!@#$%]/.test(value),
      });
    } else {
      setConfirmedPassword(value);
    }
  }

  return (
    <IonPage>
      <IonContent>
        <div className={styles.scaffold}>
          <Header
            mainText="Create your login details"
            subText={
              "Type in your email address  and set a password. \n" +
              " You can always change this later."
            }
          />
          <Input
            hintText="Email"
            label="Email address"
            id="email"
            defaultValue={business.getInfo().email}
          />
          <Input
            hintText="7gy7y"
            label="Set password"
            id="password"
            name="password"
            onChange={handlePasswordChange}
            defaultValue={localStorage.getItem("password")}
          />
          <Input
            hintText="&bull; &bull; &bull; &bull; &bull;"
            label="Confirm password"
            name="confirmedPassword"
            id="confirmedPassword"
            onChange={handlePasswordChange}
            defaultValue={localStorage.getItem("password")}
          />
          <Space height="20px" />
          <div>
            Your password must include: <br />
            <span>
              <span
                style={{ color: requirements.length ? "#007AFF" : "#000000" }}
              >
                &#10003;
              </span>
              {" 8-32 characters long"}
            </span>{" "}
            <br />
            <span>
              <span
                style={{
                  color: requirements.lowercase ? "#007AFF" : "#000000",
                }}
              >
                &#10003;
              </span>
              {" 1 lowercase character (a-z)"}
            </span>{" "}
            <br />
            <span>
              <span
                style={{
                  color: requirements.uppercase ? "#007AFF" : "#000000",
                }}
              >
                &#10003;
              </span>
              {" 1 uppercase character (A-Z)"}
            </span>{" "}
            <br />
            <span>
              <span
                style={{ color: requirements.number ? "#007AFF" : "#000000" }}
              >
                &#10003;
              </span>
              {" 1 number"}
            </span>{" "}
            <br />
            <span>
              <span
                style={{ color: requirements.special ? "#007AFF" : "#000000" }}
              >
                &#10003;
              </span>
              {" 1 special character e.g. ! @ # $ %"}
            </span>
          </div>
          <Space height="50px" />

          <RoundButton text="Continue" onClick={handleOnClickContinue} />
        </div>
      </IonContent>
    </IonPage>
  );
}

export default React.memo(CreateYourLoginDetails);
