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

function AddServices() {
  let { path, url } = useRouteMatch();
  const { business, setBusiness } = useContext(BusinessContext);
  const [staff, setStaff] = useState([]);
  const history = useHistory();

  function handleOnClickSave() {
    if (validateInput()) {
      let service = document.getElementById("service").value;
      let price = document.getElementById("price").value;
      let duration = document.getElementById("duration").value;
      const [hours, minutes] = duration.split(":");
      duration = { hours: hours, minutes: minutes };
      let notes = document.getElementById("notes").value;
      let newService = new Service(service, price, duration, notes);
      business.addService(newService);
      setBusiness(business.clone());
      history.goBack();
    }
  }

  const addStaffPrice = (staffName, staffPrice) => {
    console.log("hello");
    setStaff(staff + [new Staff(staffName, staffPrice)]);
  };

  function validateInput() {
    let service = document.getElementById("service").value;
    let duration = document.getElementById("duration").value;
    let price = document.getElementById("price").value;

    if (service === "") {
      alert("Please enter a valid service");
      return false;
    }

    if (price === "") {
      alert("Please enter a valid price");
      return false;
    }

    var pattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

    if (!pattern.test(duration)) {
      alert("Please enter a valid duration");
      return false;
    }

    return true;
  }

  return (
    <IonPage>
      <div className="scaffold">
        <Header mainText="Add Service" />
        <Input hintText="Manicure" label="Service" id="service" />

        <Input hintText="HH:MM" label="Duration" id="duration" />
        <Input hintText="Acrylic" label="Notes" id="notes" />
        <div className={styles.addService}>
          Add Staff <Space width="100%" />
          <Link to="/add_price">go to second page</Link>
          <IonIcon
            icon={add}
            style={{ fontSize: "30px", color: "#879194" }}
            onClick={() =>
              history.push("/add_staff_price", { callback: addStaffPrice })
            }
          ></IonIcon>
        </div>
        <Space height="30px" />
        <RoundButton text="Save" onClick={handleOnClickSave} />
      </div>
      <IonReactRouter>
        <Switch>
          <Route
            path="/add_price"
            render={(props) => (
              <AddStaffPrice {...props} onEvent={addStaffPrice} />
            )}
          />
        </Switch>
      </IonReactRouter>
    </IonPage>
  );
}

export default React.memo(AddServices);
