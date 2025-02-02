import React, { useState } from "react";
import styles from "./LogIn.module.css";
import "../../../App.css";
import RoundButton from "../../../components/RoundButton";
import Input from "../../../components/Input";
import ClickableText from "../../../components/ClickableText";
import Space from "../../../components/Space";
import { IonPage, IonContent } from "@ionic/react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { useHistory } from "react-router-dom";
import Header from "../../../components/Header";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  async function SignIn() {
    //let resolver;
    //let multiFactorHints;
    //const res = await createUserWithEmailAndPassword(auth, email, password);
    //await sendEmailVerification(auth.currentUser);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        history.push("/tabs/home");
        // eslint-disable-next-line no-console
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // eslint-disable-next-line no-console
        console.log(errorCode, errorMessage);
        if (error.code === "auth/multi-factor-auth-required") {
          /*
          resolver = getMultiFactorResolver(auth, error);
          // Show UI to let user select second factor.
          multiFactorHints = resolver.hints;
          const phoneInfoOptions = {
            multiFactorHint: resolver.hints[selectedIndex],
            session: resolver.session,
          };
          const phoneAuthProvider = new PhoneAuthProvider(auth);
          // Send SMS verification code
          return phoneAuthProvider
            .verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
            .then(function (verificationId) {
              // Ask user for the SMS verification code. Then:
              const cred = PhoneAuthProvider.credential(
                verificationId,
                verificationCode
              );
              const multiFactorAssertion =
                PhoneMultiFactorGenerator.assertion(cred);
              // Complete sign-in.
              return resolver.resolveSignIn(multiFactorAssertion);
            })
            .then(function (userCredential) {
              // User successfully signed in with the second factor phone number.
            });*/
        } else {
          // Handle other errors.
        }
      });
  }

  return (
    <IonPage>
      <IonContent>
        <div className={styles.scaffold}>
          <Header enableBackButton="n" />
          <div className={styles.title}>Log in to your account</div>
          <Space height="50px" />
          <div className={styles.body}>
            <form className={`${styles.column} ${styles.content}`}>
              <Input
                hintText="john.doe@gmail.com"
                label="Email"
                onChange={handleEmailChange}
              />
              <Space height="15px" />
              <Input
                hintText="********"
                label="Password"
                onChange={handlePasswordChange}
              />
              <ClickableText
                text="Forgot Password?"
                onClick={async () => {
                  if (email === "") {
                    alert("Please enter your email");
                  } else {
                    await sendPasswordResetEmail(auth, email);
                    alert("Please check your inbox to reset your password");
                  }
                }}
              />
              <Space height="15px" />
              <RoundButton
                text="Log in"
                onClick={SignIn}
                //navigateTo="/enter_mobile_number"
              />
            </form>
            <Space height="15px" />
            <div className={`${styles.row} ${styles.content}`}>
              <span>Don't have an account?</span>
              <Space width="5px" />
              <ClickableText
                text="Sign Up"
                textDecoration="underline"
                onClick={() => {
                  history.push("/create_your_login_details");
                }}
              />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default LogIn;
