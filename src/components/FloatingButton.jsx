import React from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";

function FloatingButton(prop) {
  return (
    <IonFab slot="fixed" vertical={prop.vertical} horizontal={prop.horizontal}>
      <IonFabButton color="none">
        <IonIcon icon={prop.icon}></IonIcon>
      </IonFabButton>
    </IonFab>
  );
}
export default FloatingButton;
