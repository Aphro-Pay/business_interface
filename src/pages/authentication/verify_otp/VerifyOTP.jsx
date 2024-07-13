import React, { useState, useEffect, useCallback } from "react";
import EnterMobileNumber from "../enter_mobile_number/EnterMobileNumber";
import FloatingButton from "../../../components/FloatingButton";
import Input from "../../../components/Input";
import {
  closeOutline,
  arrowBackOutline,
  phonePortraitOutline,
} from "ionicons/icons";
import RoundButton from "../../../components/RoundButton";
import OTPInput from "../../../components/OTPInput";
import Space from "../../../components/Space";
import ClickableText from "../../../components/ClickableText";
import styles from "../enter_mobile_number/EnterMobileNumber.module.css";
import { IonPage } from "@ionic/react";
import { auth } from "../../../firebase";
import {
  multiFactor,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  RecaptchaVerifier,
} from "firebase/auth";

import Header from "../../../components/Header";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Success from "../../Success";

function VerifyOTP() {
  const history = useHistory();
  const [userInput, setUserInput] = useState(["0", "0", "0", "0", "0", "0"]);
  const [verification, setverification] = useState("");

  const handleInputChange = (event) => {
    let index = event.target.id;
    userInput[index] = event.target.value == "" ? "0" : event.target.value;
    setUserInput(userInput);
  };

  const handleVerifyInput = async (event) => {
    let otpInput = userInput.join("");

    console.log(verification);
    console.log(otpInput);
    try {
      //get the OTP from user nad pass in PhoneAuthProvider
      const cred = PhoneAuthProvider.credential(verification, otpInput);
      const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

      const user = auth.currentUser;
      console.log(user);
      /* Enrolling the user in the multi-factor authentication. */
      await multiFactor(user)
        .enroll(multiFactorAssertion, "phone")
        .then((enrollment) => {
          history.push("/tabs/home");
        });
      /* Removing the user from localStorage. */
      //localStorage.removeItem("user");
    } catch (err) {
      //toast.error("Invalid OTP");
      console.log(err);
    }
  };

  const dataToPass = {
    mainText: "Done",
  };
  useEffect(() => {
    //get the user data from localStorage
    const getdata = JSON.parse(window.localStorage.getItem("user"));
    //if the data is null than redirect back to registerd page
    if (getdata === null) {
      history.push("/enter_mobile_number");
    }
    sentotp(getdata);
    //set user in state
  }, []);

  const sentotp = async (getdata) => {
    /* A listener that triggers whenever the authentication state changes. */
    auth.onAuthStateChanged(async (user) => {
      /* Decrypting the phone number that was encrypted in the previous step. */
      //const decryptedphone = cryptr.decrypt(getdata.phone);
      const phone = getdata.phone;
      console.log(phone);
      /* Creating a new recaptcha verifier. */
      const recaptchaVerifier = new RecaptchaVerifier(auth, "2fa-captcha", {
        size: "invisible",
      });
      recaptchaVerifier.render();
      try {
        await multiFactor(user)
          .getSession()
          .then(function (multiFactorSession) {
            // Specify the phone number and pass the MFA session.
            const phoneInfoOptions = {
              phoneNumber: `+${phone}`,
              session: multiFactorSession,
            };

            const phoneAuthProvider = new PhoneAuthProvider(auth);

            // Send SMS verification code.
            return phoneAuthProvider.verifyPhoneNumber(
              phoneInfoOptions,
              recaptchaVerifier
            );
          })
          .then(function (verificationId) {
            setverification(verificationId);
          });
      } catch (err) {
        recaptchaVerifier.clear();
      }
    });
  };

  return (
    <IonPage>
      <div>
        <div className={styles.scaffold}>
          <Header />
          <div className={styles.body}>
            <div
              id="2fa-captcha"
              style={{ display: "flex", justifyContent: "center" }}
            ></div>
            <div className={`${styles.content} ${styles.column}`}>
              <h2>Verify OTP</h2>
              <div
                className={`${styles.content} ${styles.row}`}
                style={{ justifyContent: "center" }}
              >
                {[...Array(6)].map((x, i) => (
                  <div key={i} style={{ margin: "0px 5px 0px 5px" }}>
                    <OTPInput
                      maxLength="1"
                      onChange={handleInputChange}
                      id={i}
                    />
                  </div>
                ))}
              </div>
              <div className={`${styles.content} ${styles.row}`}>
                <span>Didn't Recieve the Code?</span>
                <Space width="5px" />
                <ClickableText text="Resend" />
              </div>
            </div>
          </div>
          <div style={{ padding: "30px" }}>
            <RoundButton
              text="Verify OTP"
              //navigateTo="/success/done"
              onClick={handleVerifyInput}
            />
          </div>
        </div>
      </div>
    </IonPage>
  );
}

export default VerifyOTP;
