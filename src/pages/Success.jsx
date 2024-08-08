import React, { useContext, useEffect, useState } from "react";
import { IonIcon, IonPage } from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";
import { useParams } from "react-router-dom";
import Space from "../components/Space";
import { BusinessContext } from "../providers/BusinessProvider";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Success(prop) {
  const { business } = useContext(BusinessContext);
  const history = useHistory();

  const { param } = useParams();
  const [state, setState] = useState(param);

  useEffect(() => {
    async function updateState() {
      if (state !== "done") {
        let isError = await business.register();
        if (isError) {
          setState(isError);
        } else {
          setState("done");
        }
      }
    }
    setTimeout(updateState, 3500);
  }, [business, state]);

  window.onpopstate = () => {
    console.log("here");
    history.go("/");
  };

  return (
    <IonPage>
      <div
        style={{
          display: "flex",
          flex: "1",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <IonIcon
          icon={checkmarkCircle}
          style={{ fontSize: "60px", color: "#004096" }}
        ></IonIcon>
        <Space height="5px" />
        <div>
          {state === "done"
            ? "Done"
            : state?.includes("Error")
            ? state?.substring(10)
            : "Onboarding Complete"}
        </div>
        <Space height="10px"></Space>
        <div>
          {state === "done"
            ? ""
            : state?.includes("Error")
            ? "Please try again or report to hello@aphropay.com. "
            : "You will be redirected to your Home Screen shortly"}
        </div>
      </div>
    </IonPage>
  );
}

export default React.memo(Success);
