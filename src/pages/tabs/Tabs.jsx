import React, { useContext, useEffect } from "react";
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
import AddBooking from "./bookings/AddBooking";
import TransactionDetails from "./payments/TransactionDetails";
import { BusinessContext } from "../../providers/BusinessProvider";
import Business from "../../models/Business";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../providers/AuthProvider";

function Tabs() {
  const { setBusiness } = useContext(BusinessContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBusinessProfile = async () => {
      await getDoc(doc(db, "businesses", user.uid)).then((docSnap) => {
        const newData = docSnap.data();
        setBusiness(new Business(newData));
      });
    };
    fetchBusinessProfile();
  }, [setBusiness, user]);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/home">
          <Home />
        </Route>
        <Route exact path="/tabs/bookings">
          <Bookings />
        </Route>
        <Route exact path="/tabs/bookings/add">
          <AddBooking />
        </Route>
        <Route exact path="/tabs/payments">
          <Payments />
        </Route>
        <Route exact path="/tabs/payments/transaction_details">
          <TransactionDetails />
        </Route>

        <Route exact path="/tabs/settings">
          <Settings />
        </Route>
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

        {/* 
        <IonTabButton tab="payments" href="/tabs/payments">
          <IonIcon icon={cashOutline} />
          <IonLabel>Payments</IonLabel>
        </IonTabButton>
        */}

        <IonTabButton tab="settings" href="/tabs/settings">
          <IonIcon icon={personOutline} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
export default React.memo(Tabs);
