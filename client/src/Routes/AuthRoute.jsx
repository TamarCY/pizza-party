import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { ROUTES } from "../constants/routes.constants";

function AuthRoute() {

//   return user ? <Outlet /> : <Navigate to={ROUTES.AUTH} />;
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to={"/"} />;
}

export default AuthRoute;