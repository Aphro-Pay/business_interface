import { IonPage, IonIcon, IonContent } from "@ionic/react";
import React from "react";
import Header from "../../../components/Header";
import moment from "moment";
import { calendarNumberOutline } from "ionicons/icons";
import Space from "../../../components/Space";
import ComingSoon from "../../../components/ComingSoon";

function Home() {
  return (
    <IonPage>
      <IonContent>
        <div className="tab-content">
          <Header
            type="tabView"
            mainText={["Good Day,", <br />, " Hair Comes Trouble! 👋🏾"]}
          />
          <div className="flexColumn">
            <div className="flexRow">
              <IonIcon icon={calendarNumberOutline}></IonIcon>
              <Space width="5px" />
              <span style={{ fontWeight: "600" }}>{moment().format("LL")}</span>
            </div>

            <h3 style={{ fontWeight: "500" }}>Upcoming appointments</h3>

            <div>
              <ComingSoon />
            </div>

            <h4 style={{ fontWeight: "500" }}>Metrics</h4>
            <div>
              <ComingSoon />
            </div>
            {/*<BarChart />*/}
            <h4 style={{ fontWeight: "500" }}>Visitors Report</h4>
            <div>
              <ComingSoon />
            </div>
            {/*<BarChart />*/}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default React.memo(Home);
