import React from "react";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/react";

import { Route, Redirect } from "react-router-dom";

import {
  homeSharp,
  calendarNumberOutline,
  cashOutline,
  personOutline,
} from "ionicons/icons";

import Home from "./home/Home";
import Bookings from "./bookings/Bookings";
import Payments from "./payments/Payments";
import Settings from "./settings/Settings";

function Tabs() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/home" />
        {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/tabs/home" render={() => <Home />} exact={true} />
        <Route path="/tabs/bookings" render={() => <Bookings />} exact={true} />
        <Route path="/tabs/payments" render={() => <Payments />} exact={true} />
        <Route path="/tabs/settings" render={() => <Settings />} exact={true} />
        <Route exact path="/tabs">
          <Redirect to="/tabs/home" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon icon={homeSharp} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="bookings" href="/tabs/bookings">
          <IonIcon icon={calendarNumberOutline} />
          <IonLabel>Bookings</IonLabel>
        </IonTabButton>

        <IonTabButton tab="payments" href="/tabs/payments">
          <IonIcon icon={cashOutline} />
          <IonLabel>Payments</IonLabel>
        </IonTabButton>

        <IonTabButton tab="settings" href="/tabs/settings">
          <IonIcon icon={personOutline} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
export default Tabs;
