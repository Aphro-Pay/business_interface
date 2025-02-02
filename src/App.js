import "./App.css";
import "@ionic/react/css/core.css";
import React, { useContext, useEffect, useState } from "react";

import {
  IonApp,
  IonPage,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";
import Splash from "./pages/Splash";
import LogIn from "./pages/authentication/log_in/LogIn";
import VerifyOTP from "./pages/authentication/verify_otp/VerifyOTP";
import EnterMobileNumber from "./pages/authentication/enter_mobile_number/EnterMobileNumber";
import Success from "./pages/Success";
import CreateYourLoginDetails from "./pages/onboarding/create_your_login_details/CreateYourLoginDetails";
import SetUpYourBusinessProfile from "./pages/onboarding/set_up_your_business_profile/SetUpYourBusinessProfile";
import UploadYourLogo from "./pages/onboarding/upload_your_logo/UploadYourLogo";
import BusinessHours from "./pages/onboarding/business_hours/BusinessHours";
import YourServices from "./pages/onboarding/your_services/YourServices";
import StaffManagement from "./pages/onboarding/staff_management/StaffManagement";
import AddStaffName from "./pages/onboarding/staff_management/AddStaffName";
import OpeningHours from "./pages/onboarding/business_hours/OpeningHours";
import Tabs from "./pages/tabs/Tabs";
import Business, { Staff } from "./models/Business";
import AddServices from "./pages/onboarding/your_services/AddServices";
import { AuthContext } from "./providers/AuthProvider";
import PrivateRoute from "./routes/Private";
import PublicRoute from "./routes/Public";
import AddStaffPrice from "./pages/onboarding/your_services/AddStaffPrice";
import { BusinessContext } from "./providers/BusinessProvider";
import { db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";

setupIonicReact();

function App() {
  const { setBusiness } = useContext(BusinessContext);
  const { user } = useContext(AuthContext);
  const [staff, setStaff] = useState([]);
  const [service, setService] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  const addStaffPrice = (staffName, staffPrice) => {
    setStaff(staff.concat([new Staff(staffName, staffPrice).toMap()]));
  };

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "businesses", user.uid);
      const unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            setBusiness(new Business(docSnap.data()));
          } else {
            // eslint-disable-next-line no-console
            console.log("No such document!");
          }
          // eslint-disable-next-line no-console
          console.log(false);
        },
        (err) => {
          // eslint-disable-next-line no-console
          console.log(err.message);
          // eslint-disable-next-line no-console
          console.log(false);
        }
      );

      // Clean up the listener on component unmount
      return () => unsubscribe();
    }
  }, [user, setBusiness]);

  return (
    <IonApp>
      <IonReactRouter>
        <Route path="/*" exact={true}>
          <PublicRoute>
            <IonRouterOutlet>
              <Route path="/splash" exact={true}>
                <Splash />
              </Route>
              {/*<Redirect from="/" to="/splash" exact />*/}
              <Route path="/login" exact={true}>
                <LogIn />
              </Route>
              <Route path="/enter_mobile_number" exact={true}>
                <EnterMobileNumber />
              </Route>
              <Route path="/verify_otp" exact={true}>
                <VerifyOTP />
              </Route>
              <Route path="/success/:state" exact={true}>
                <Success />
              </Route>
              <Route path="/create_your_login_details" exact={true}>
                <CreateYourLoginDetails />
              </Route>
            </IonRouterOutlet>
          </PublicRoute>
        </Route>

        <Route path="/set_up_your_business_profile" exact={true}>
          <SetUpYourBusinessProfile />
        </Route>
        <Route path="/upload_your_logo" exact={true}>
          <UploadYourLogo />
        </Route>

        <Route path="/business_hours" exact={true}>
          <IonPage>
            <BusinessHours />
          </IonPage>
        </Route>

        <Route path="/your_services" exact={true}>
          <IonPage>
            <YourServices />
          </IonPage>
        </Route>

        <Route path="/add_service" exact={true}>
          <AddServices
            setStaff={setStaff}
            staff={staff}
            setService={setService}
            service={service}
            setDuration={setDuration}
            duration={duration}
            setNotes={setNotes}
            notes={notes}
          />
        </Route>

        <Route path="/staff_management" exact={true}>
          <IonPage>
            <StaffManagement />
          </IonPage>
        </Route>

        <Route path="/add_staff_name" exact={true}>
          <IonPage>
            <AddStaffName />
          </IonPage>
        </Route>

        <Route path="/add_staff_price" exact={true}>
          <AddStaffPrice addStaffPrice={addStaffPrice} />
        </Route>

        <Route path="/opening_hours/:state" exact={true}>
          <OpeningHours />
        </Route>

        <Route path="/" exact={true}>
          <PrivateRoute>
            <IonReactRouter>
              <Route path="/tabs/:id">
                <Tabs />
              </Route>
              <Route path="/tabs/upload_your_logo" exact={true}>
                <UploadYourLogo />
              </Route>
              <Route path="/tabs/add_staff_name" exact={true}>
                <AddStaffName />
              </Route>
              <Route path="/tabs/set_up_your_business_profile" exact={true}>
                <SetUpYourBusinessProfile />
              </Route>
              <Route
                path="/tabs/your_services"
                component={YourServices}
                exact={true}
              ></Route>
              <Route path="/tabs/add_service" exact={true}>
                <AddServices
                  setStaff={setStaff}
                  staff={staff}
                  setService={setService}
                  service={service}
                  setDuration={setDuration}
                  duration={duration}
                  setNotes={setNotes}
                  notes={notes}
                />
              </Route>
              <Route
                path="/tabs/staff_management"
                component={StaffManagement}
                exact={true}
              ></Route>
              <Route path="/tabs/add_staff_name" exact={true}>
                <AddStaffName />
              </Route>
              <Route
                path="/tabs/business_hours"
                component={BusinessHours}
                exact={true}
              ></Route>
              <Route path="/tabs/opening_hours/:state" exact={true}>
                <OpeningHours />
              </Route>
              <Route path="/tabs/add_staff_price" exact={true}>
                <AddStaffPrice addStaffPrice={addStaffPrice} />
              </Route>
              <Redirect from="/tabs" to="/tabs/home" exact={true} />
            </IonReactRouter>
          </PrivateRoute>
        </Route>
      </IonReactRouter>
    </IonApp>
    /* <div className="App">
      
      <Success />
    </div><div className="App">
      <header className="App-header">
        <img
          src="./assets/images/aphro_pay_logo.jpg"
          className="App-logo"
          alt="logo"
        />
      </header>
    </div>*/
  );
}

export default React.memo(App);
