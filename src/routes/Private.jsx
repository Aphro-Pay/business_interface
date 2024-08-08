import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);

  console.log("Private");

  return user ? children : <Redirect to="/splash" />;
}

export default PrivateRoute;
