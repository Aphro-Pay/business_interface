import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import Header from "../../../components/Header";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ComingSoon from "../../../components/ComingSoon";

function AddBooking() {
  const history = useHistory();
  return (
    <IonPage>
      <IonContent>
        <div className="tab-content">
          <Header
            mainText="Add Booking"
            type="tabView"
            enableBackButton="y"
            goBack={() => {
              history.replace("/tabs/bookings");
            }}
          />
          {/* 
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
          />*/}

          <div
            className="flexColumn"
            style={{ justifyContent: "center", flex: 0.8 }}
          >
            <ComingSoon />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default AddBooking;
