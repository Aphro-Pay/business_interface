import React, { useState } from "react";
import styles from "./EnterMobileNumber.module.css";
import Input from "../../../components/Input";
import { phonePortraitOutline } from "ionicons/icons";
import RoundButton from "../../../components/RoundButton";
import { IonPage } from "@ionic/react";
import Header from "../../../components/Header";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function EnterMobileNumber() {
  const [phone, setPhone] = useState("");
  const history = useHistory();

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const registerMobileNumber = async (e) => {
    //e.preventDefault();
    try {
      //Form fields validation
      if (phone !== "") {
        if (phone.length < 10)
          return alert("Please enter a valid phone number");
        // Creating a new user with the email and password
        //const res = await auth.createUserWithEmailAndPassword(email, password);
        //const user = res.user;
        //encrypt the user data
        //const encryptedphone = cryptr.encrypt(`+91${phone}`);
        //const encryptedpassword = cryptr.encrypt(password);

        const userdata = {
          //email: email,
          //password: encryptedpassword,
          phone: phone,
          //user: user,
        };
        //Sending an verification link to user's email id
        window.localStorage.setItem("user", JSON.stringify(userdata));
        //setEmail("");
        //setPassword("");
        setPhone("");
        history.push("/verify_otp");
      } else {
        alert("Please fill all the fields");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <IonPage>
      <div>
        <div className={styles.scaffold}>
          <Header />
          <div className={styles.body}>
            <div
              className={`${styles.phoneNumber} ${styles.content} ${styles.column}`}
            >
              <h2>Enter Mobile Number</h2>
              <Input
                type="number"
                label="Phone Number"
                hintText="(+234) 802 205 1307"
                borderPadding="10px 0px 10px 5px"
                icon={phonePortraitOutline}
                backgroundColor="white"
                className="phoneNumber"
                onChange={handlePhoneChange}
              />
            </div>
          </div>
          <div style={{ padding: "30px" }}>
            <RoundButton
              text="Send OTP"
              //navigateTo="/verify_otp"
              onClick={registerMobileNumber}
            />
          </div>
        </div>
      </div>
    </IonPage>
  );
}

export default EnterMobileNumber;
