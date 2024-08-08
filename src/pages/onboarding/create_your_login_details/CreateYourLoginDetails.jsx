import React, { useContext, useState } from "react";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import RoundButton from "../../../components/RoundButton";
import Space from "../../../components/Space";
import { IonPage } from "@ionic/react";
import { BusinessContext } from "../../../providers/BusinessProvider";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function CreateYourLoginDetails() {
  const { business, setBusiness } = useContext(BusinessContext);
  const [password, setPassword] = useState();
  const history = useHistory();
  const [confirmedPassword, setConfirmedPassword] = useState();

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

    if (password == null || password != confirmedPassword) {
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
    } else {
      setConfirmedPassword(value);
    }
  }

  return (
    <IonPage>
      <div className="scaffold">
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
          &#10003; 8-32 characters long <br />
          &#10003; 1 lowercase character (a-z) <br />
          &#10003; 1 uppercase character (A-z) <br />
          &#10003; 1 number <br />
          &#10003; 1 special character e.g. ! @ # $ %
        </div>
        <Space height="50px" />

        <RoundButton text="Continue" onClick={handleOnClickContinue} />
      </div>
    </IonPage>
  );
}

export default React.memo(CreateYourLoginDetails);
