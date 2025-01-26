import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import Header from "../../../components/Header";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ComingSoon from "../../../components/ComingSoon";
import styles from "./Bookings.module.css";
import Input from "../../../components/Input";
import RoundButton from "../../../components/RoundButton";

function AddBooking() {
  const history = useHistory();
  return (
    <IonPage>
      <IonContent>
        <div className={styles.scaffold}>
          <Header
            mainText="Add Booking"
            type="tabView"
            enableBackButton="y"
            goBack={() => {
              history.replace("/tabs/bookings");
            }}
            marginTop="30px"
          />
          <Input hintText="Ahmed" label="First name" />
          <Input hintText="Musa" label="Last name" />
          <Input hintText="08027176539" label="Phone number" />
          <Input hintText="Manicure (N10,000)" label="Service" />
          <Input hintText="Jennifer" label="Staff" />
          <RoundButton
            text="Submit"
            onClick={() => {
              history.replace("/tabs/bookings");
            }}
          />
        </div>
      </IonContent>
    </IonPage>
  );
}

export default AddBooking;
