import { IonIcon, IonPage, IonRouterOutlet } from "@ionic/react";
import React, { useContext, useState } from "react";
import {
  useHistory,
  Link,
  Route,
  useRouteMatch,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import RoundButton from "../../../components/RoundButton";
import { Service, Staff } from "../../../models/Business";
import { BusinessContext } from "../../../providers/BusinessProvider";
import { add } from "ionicons/icons";
import Space from "../../../components/Space";
import styles from "./YourServices.module.css";
import AddStaffPrice from "./AddStaffPrice";
import { IonReactRouter } from "@ionic/react-router";
import { closeOutline } from "ionicons/icons";

function AddServices(prop) {
  let { path, url } = useRouteMatch();
  const { business, setBusiness } = useContext(BusinessContext);

  const [service, setService] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  let staff = prop.staff ?? [];

  console.log(staff);

  const history = useHistory();

  function handleOnClickSave() {
    if (validateInput()) {
      let service = document.getElementById("service").value;
      let duration = document.getElementById("duration").value;
      const [hours, minutes] = duration.split(":");
      duration = { hours: hours, minutes: minutes };
      let notes = document.getElementById("notes").value;
      let newService = new Service(service, staff, duration, notes);
      business.addService(newService);
      setBusiness(business.clone());
      prop.setStaff([]);
      history.goBack();
    }
  }

  function validateInput() {
    let service = document.getElementById("service").value;
    let duration = document.getElementById("duration").value;

    if (service === "") {
      alert("Please enter a valid service");
      return false;
    }

    var pattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

    if (!pattern.test(duration)) {
      alert("Please enter a valid duration");
      return false;
    }

    if (staff.length == 0) {
      alert("Please add a staff");
      return false;
    }

    return true;
  }

  function handleInputChange(event) {
    const { value, name } = event.target;
    console.log(name);

    switch (name) {
      case "service":
        setService(value);
        break;
      case "duration":
        setDuration(value);
        break;
      case "notes":
        setNotes(value);
        break;

      default:
        break;
    }
  }

  return (
    <IonPage>
      <div className="scaffold">
        <Header mainText="Add Service" />
        <Input
          hintText="Manicure"
          label="Service"
          id="service"
          onChange={handleInputChange}
          defaultValue={service}
        />

        <Input
          hintText="HH:MM"
          label="Duration"
          id="duration"
          onChange={handleInputChange}
          defaultValue={duration}
        />
        <Input
          hintText="Acrylic"
          label="Notes"
          id="notes"
          onChange={handleInputChange}
          defaultValue={notes}
        />
        {staff.map((staff, index) => (
          <div key={index}>
            <div className={styles.flexRow}>
              <div style={{ display: "inline-block" }}>
                <div className={styles.staffName}>{staff.name}</div>
                <div className={styles.staffName}>&#8358;{staff.price}</div>
              </div>
              <Space flexGrow="1"></Space>
              <IonIcon
                icon={closeOutline}
                onClick={() => {
                  prop.staff.splice(index, 1);
                  setBusiness(business.clone());
                }}
              ></IonIcon>
            </div>

            <Space height="25px"></Space>
          </div>
        ))}
        <div className={styles.addService}>
          Add Staff <Space width="100%" />
          <IonIcon
            icon={add}
            style={{ fontSize: "30px", color: "#879194" }}
            onClick={() => history.push("/add_staff_price")}
          ></IonIcon>
        </div>
        <Space height="30px" />
        <RoundButton text="Save" onClick={handleOnClickSave} />
      </div>
    </IonPage>
  );
}

export default React.memo(AddServices);
