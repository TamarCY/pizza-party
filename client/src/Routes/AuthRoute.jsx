import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import partyState from "../Recoil/atoms/partyAtom";
// import { ROUTES } from "../constants/routes.constants";

function AuthRoute() {
  const party = useRecoilValue(partyState);

//   return user ? <Outlet /> : <Navigate to={ROUTES.AUTH} />;
  return party ? <Outlet /> : <Navigate to={"/"} />;
}

export default AuthRoute;