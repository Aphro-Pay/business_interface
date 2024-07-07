import "./App.css";
import "@ionic/react/css/core.css";

import { IonApp, IonRouterOutlet } from "@ionic/react";
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
import { setupIonicReact } from "@ionic/react";

setupIonicReact();

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/splash" component={Splash} exact />
          <Redirect from="/" to="/splash" exact />
          <Route path="/login" component={LogIn} />
          <Route path="/enter_mobile_number" component={EnterMobileNumber} />
          <Route path="/verify_otp" component={VerifyOTP} />
          <Route path="/success/:state" component={Success} />
          <Route
            path="/create_your_login_details"
            component={CreateYourLoginDetails}
          />
          <Route
            path="/set_up_your_business_profile"
            component={SetUpYourBusinessProfile}
          />
          <Route path="/upload_your_logo" component={UploadYourLogo} />
          <Route path="/business_hours" component={BusinessHours} />
          <Route path="/your_services" component={YourServices} />
        </IonRouterOutlet>
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

export default App;
