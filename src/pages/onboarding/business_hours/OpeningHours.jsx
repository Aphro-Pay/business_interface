import { IonPage } from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import Input from "../../../components/Input";
import {
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Header from "../../../components/Header";
import RoundButton from "../../../components/RoundButton";
import { BusinessContext } from "../../../providers/BusinessProvider";
import { IonReactRouter } from "@ionic/react-router";
import Space from "../../../components/Space";

function OpeningHours(prop) {
  const { business, setBusiness } = useContext(BusinessContext);
  const history = useHistory();
  const { state } = useParams();

  let businessHours = business.getInfo().businessHours;

  const [selectedStatus, setSelectedStatus] = useState(
    businessHours[state].Status
  );

  console.log(selectedStatus);

  function handleOnClickSave(e) {
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
      history.goBack();
    }
  }

  function validateInput() {
    let open = document.getElementById("open").value;
    let close = document.getElementById("close").value;

    var pattern = /^([0-9]|[0-1][0-9]|2[0-3]):[0-5][0-9][a p A P][M m]/;

    if (!pattern.test(open)) {
      alert("Please enter a valid time format for opening hours");
      return false;
    }

    if (!pattern.test(close)) {
      alert("Please enter a valid time format for closing hours");
      return false;
    }

    return true;
  }
  useEffect(() => {}, [document.getElementById("status")?.value]);

  function handleStatusChange(e) {
    setSelectedStatus(e.target.value);
  }

  return (
    <IonReactRouter>
      <IonPage>
        <div className="scaffold">
          <Header mainText="Opening Hours" />
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
              fontSize: "14px",
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
