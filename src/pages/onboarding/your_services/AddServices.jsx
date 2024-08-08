import { IonIcon, IonPage } from "@ionic/react";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import RoundButton from "../../../components/RoundButton";
import { Service } from "../../../models/Business";
import { BusinessContext } from "../../../providers/BusinessProvider";
import { add, closeOutline } from "ionicons/icons";
import Space from "../../../components/Space";
import styles from "./YourServices.module.css";
import { AuthContext } from "../../../providers/AuthProvider";

function AddServices(prop) {
  const { business, setBusiness } = useContext(BusinessContext);
  const { user } = useContext(AuthContext);

  let staff = prop.staff ?? [];

  const history = useHistory();

  async function handleOnClickSave() {
    if (validateInput()) {
      let service = document.getElementById("service").value;
      let duration = document.getElementById("duration").value;
      const [hours, minutes] = duration.split(":");
      duration = { hours: hours, minutes: minutes };
      let notes = document.getElementById("notes").value;
      let newService = new Service(service, staff, duration, notes);
      business.addService(newService);
      setBusiness(business.clone());
      restoreDefault();
      user ? history.replace("/tabs/your_services") : history.goBack();
    }
  }

  function restoreDefault() {
    prop.setStaff([]);
    prop.setService("");
    prop.setDuration("");
    prop.setNotes("");
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

    if (staff.length === 0) {
      alert("Please add a staff");
      return false;
    }

    return true;
  }

  function handleInputChange(event) {
    const { value, id } = event.target;

    switch (id) {
      case "service":
        prop.setService(value);
        break;
      case "duration":
        prop.setDuration(value);
        break;
      case "notes":
        prop.setNotes(value);
        break;

      default:
        break;
    }
  }

  return (
    <IonPage>
      <div className="scaffold">
        <Header
          mainText="Add Service"
          onClick={restoreDefault}
          type={user ? "tabView" : null}
          enableBackButton={user ? "y" : null}
          goBack={
            user
              ? () => {
                  history.replace("/tabs/your_services");
                }
              : null
          }
        />
        <Input
          hintText="Manicure"
          label="Service"
          id="service"
          onChange={handleInputChange}
          defaultValue={prop.service}
        />

        <Input
          hintText="HH:MM"
          label="Duration"
          id="duration"
          onChange={handleInputChange}
          defaultValue={prop.duration}
        />
        <Input
          hintText="Acrylic"
          label="Notes"
          id="notes"
          onChange={handleInputChange}
          defaultValue={prop.notes}
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
        {staff.length > 0 && staff[0].name === "All Staff" ? null : (
          <div>
            <div className={styles.addService}>
              Add Staff <Space width="100%" />
              <IonIcon
                icon={add}
                style={{ fontSize: "30px", color: "#879194" }}
                onClick={() => {
                  user
                    ? history.replace("/tabs/add_staff_price")
                    : history.push("/add_staff_price");
                }}
              ></IonIcon>
            </div>
            <Space height="30px" />
          </div>
        )}
        <RoundButton text="Save" onClick={handleOnClickSave} />
      </div>
    </IonPage>
  );
}

export default React.memo(AddServices);
