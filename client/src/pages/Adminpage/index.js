import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Admin from "../../components/Admin";

const Adminpage = () => {
  // const admin = useSelector((state) => state.admin);
  // const { status } = admin;

  const login = useSelector((state) => state.login);
  const { userInfo } = login;

  if (userInfo.roleID === "superuser") {
    // console.log("asd")
    return(
      <Admin />
    )
  } else {
    return <Redirect to="/" />;
  }
};

export default Adminpage;
