import { IonContent, IonPage } from "@ionic/react";
import React, { useContext, useState } from "react";
import Header from "../../../components/Header";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ComingSoon from "../../../components/ComingSoon";
import RoundButton from "../../../components/RoundButton";
import Input from "../../../components/Input";
import Booking from "../../../models/Booking";
import { AuthContext } from "../../../providers/AuthProvider";
import DatePicker from "react-datepicker";
import DateTimePicker from "react-datetime-picker";
import { DateTime } from "luxon";
import "react-datepicker/dist/react-datepicker.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import Space from "../../../components/Space";
import { BusinessContext } from "../../../providers/BusinessProvider";

function AddBooking() {
  const { user } = useContext(AuthContext);
  const { business, setBusiness } = useContext(BusinessContext);
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [serviceIdx, setServiceIdx] = useState(0);
  const [staff, setStaff] = useState("All Staff");
  const [date, setDate] = useState(Date.now());

  function handleInputChange(event) {
    const { value, name } = event.target;
    console.log(name);
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "service":
        setServiceIdx(value);
        break;
      case "staff":
        setStaff(value);
        break;

      default:
        break;
    }
  }

  function validateInput() {
    if (firstName === "") {
      alert("Please enter a valid name");
      return false;
    }

    if (!email.match(/\S+@\S+\.\S+/)) {
      alert("Please enter a valid email");
      return false;
    }

    return true;
  }

  async function navigate() {
    if (validateInput()) {
      const newBooking = new Booking({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        service: business.services[serviceIdx],
        staff: staff,
        date: DateTime.fromJSDate(new Date(date)),
      });
      try {
        newBooking.register();
        history.replace("/tabs/bookings");
      } catch (error) {
        console.error("Error adding booking: ", error);
        alert("Failed to add booking.");
      }
    }
  }

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

          <Input
            hintText="Ahmed"
            label="First name"
            name="firstName"
            defaultValue={firstName}
            onChange={handleInputChange}
          />
          <Input
            hintText="Musa"
            label="Last name"
            name="lastName"
            defaultValue={lastName}
            onChange={handleInputChange}
          />
          <Input
            hintText="ahmedmusa@gmail.com"
            label="Email address"
            name="email"
            defaultValue={email}
            onChange={handleInputChange}
          />
          <Input
            hintText="08027176539"
            label="Phone number"
            name="phoneNumber"
            defaultValue={phoneNumber}
            onChange={handleInputChange}
          />
          <label className="input-label" htmlFor="service">
            Service
          </label>
          <select
            value={serviceIdx}
            onChange={handleInputChange}
            name="service"
            style={{
              border: "1.5px solid #c0c0c0",
              borderRadius: "5px",
              marginBottom: "20px",
              marginTop: "5px",
              padding: "15px 5px",
              fontSize: "15px",
              display: "flex",
              flexDirection: "row",
              alignItems: "end",
              backgroundColor: "#e5edf5",
            }}
          >
            {business.services.map((service, index) => (
              <option key={index} value={index}>
                {service.service}
              </option>
            ))}
          </select>
          <label className="input-label" htmlFor="staff">
            Staff
          </label>
          <select
            value={staff}
            onChange={handleInputChange}
            name="staff"
            style={{
              border: "1.5px solid #c0c0c0",
              borderRadius: "5px",
              marginBottom: "20px",
              marginTop: "5px",
              padding: "15px 5px",
              fontSize: "15px",
              display: "flex",
              flexDirection: "row",
              alignItems: "end",
              backgroundColor: "#e5edf5",
            }}
          >
            {business.services[serviceIdx].staff.map((staff, index) => (
              <option key={index} value={staff.name}>
                {staff.name}
              </option>
            ))}
          </select>
          <label className="input-label" htmlFor="status">
            Date
          </label>
          <div
            style={{
              border: "1.5px solid #c0c0c0",
              borderRadius: "5px",
              marginBottom: "20px",
              marginTop: "5px",
              padding: "15px 5px",
              fontSize: "15px",
              display: "flex",
              flexDirection: "row",
              alignItems: "end",
              backgroundColor: "#e5edf5",
            }}
          >
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
            />
          </div>
          <RoundButton
            text="Submit"
            onClick={() => {
              navigate();
            }}
          />
        </div>
      </IonContent>
    </IonPage>
  );
}

export default AddBooking;
