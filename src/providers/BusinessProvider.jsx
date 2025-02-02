import { createContext, useEffect, useState } from "react";
import Business from "../models/Business";

function getInitialState() {
  const business = localStorage.getItem("business");
  return business ? new Business(JSON.parse(business)) : new Business();
}
export const BusinessContext = createContext(null);

const BusinessProvider = ({ children }) => {
  const [business, setBusiness] = useState(getInitialState);
  useEffect(() => {
    localStorage.setItem("business", JSON.stringify(business));
  }, [business]);

  return (
    <BusinessContext.Provider value={{ business, setBusiness }}>
      {children}
    </BusinessContext.Provider>
  );
};

export default BusinessProvider;
