import { IonPage } from "@ionic/react";
import React, { useContext, useState } from "react";
import Input from "../../../components/Input";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Header from "../../../components/Header";
import RoundButton from "../../../components/RoundButton";
import { BusinessContext } from "../../../providers/BusinessProvider";
import { IonReactRouter } from "@ionic/react-router";
import Space from "../../../components/Space";
import { AuthContext } from "../../../providers/AuthProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "./BusinessHours.module.css";
function OpeningHours() {
  const { business, setBusiness } = useContext(BusinessContext);
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const { state } = useParams();

  let businessHours = business.getInfo().businessHours;

  const [selectedStatus, setSelectedStatus] = useState(
    businessHours[state].Status
  );

  async function handleOnClickSave() {
    let open = null;
    let close = null;

    if (selectedStatus === "Open") {
      open = document.getElementById("open").value.toUpperCase();
      close = document.getElementById("close").value.toUpperCase();
    }
    if (selectedStatus === "Closed" || validateInput()) {
      business.updateBusinessHours({
        day: state,
        status: selectedStatus,
        open: open,
        close: close,
      });
      setBusiness(business.clone());

      if (user) {
        try {
          const docRef = doc(db, "businesses", user.uid); // Replace 'collectionName' with your collection name
          await updateDoc(docRef, {
            businessHours: {
              ...business.businessHours,
              [state]: {
                Status: selectedStatus,
                Open: open,
                Close: close,
              },
            },
          });
          history.replace("/tabs/business_hours");
        } catch (error) {
          alert("Failed to update business hours.");
        }
      } else {
        history.goBack();
      }
    }
  }

  function validateInput() {
    let open = document.getElementById("open").value;
    let close = document.getElementById("close").value;

    var pattern = /^([0-9]|[0-1][0-9]|2[0-3]):[0-5][0-9][a p A P][M m]$/;

    if (!pattern.test(open)) {
      alert("Please enter a valid time format for opening hours");
      return false;
    }

    if (!pattern.test(close)) {
      alert("Please enter a valid time format for closing hours");
      return false;
    }

    // Convert times to 24-hour format for comparison
    let openTime = convertTo24Hour(open);
    let closeTime = convertTo24Hour(close);

    if (closeTime <= openTime) {
      alert("Closing time must be after opening time");
      return false;
    }

    return true;
  }

  function convertTo24Hour(time) {
    let [hours, minutesPeriod] = time.split(":");
    let minutes = minutesPeriod.slice(0, 2);
    let period = minutesPeriod.slice(2).toUpperCase();

    hours = parseInt(hours);

    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return hours * 60 + parseInt(minutes); // Convert to minutes for easier comparison
  }

  function handleStatusChange(e) {
    setSelectedStatus(e.target.value);
  }

  return (
    <IonReactRouter>
      <IonPage>
        <div className={styles.scaffold}>
          <Header
            mainText="Opening Hours"
            type={user ? "tabView" : null}
            enableBackButton={user ? "y" : null}
            goBack={
              user
                ? () => {
                    history.replace("/tabs/business_hours");
                  }
                : null
            }
          />
          <Input
            hintText={state}
            label="Day"
            id="Day"
            defaultValue={state}
            readOnly={true}
          />
          <label className="input-label" htmlFor="status">
            Status
          </label>
          <Space height="5px" />
          <select
            defaultValue={businessHours[state].Status}
            value={selectedStatus}
            onChange={handleStatusChange}
            id="status"
            style={{
              border: "1.5px solid #c0c0c0",
              borderRadius: "5px",
              marginBottom: "20px",
              padding: "15px 5px",
              fontSize: "15px",
              display: "flex",
              flexDirection: "row",
              alignItems: "end",
              backgroundColor: "#e5edf5",
            }}
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>

          {selectedStatus === "Open" ? (
            <div>
              <Input
                hintText="10:00AM"
                label="Opening hours (e.g. 9:00AM)"
                id="open"
                defaultValue={businessHours[state].Open}
              />
              <Input
                hintText="6:00PM"
                label="Closing hours (e.g. 7:00PM)"
                id="close"
                defaultValue={businessHours[state].Close}
              />
            </div>
          ) : (
            <Space height="25px" />
          )}

          <RoundButton text="Save" onClick={handleOnClickSave} />
        </div>
      </IonPage>
    </IonReactRouter>
  );
}

export default React.memo(OpeningHours);
