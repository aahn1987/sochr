import React from "react";
import Cookies from "js-cookie";
import { BASEURI } from "../../../Context/SysConfs";
import { UserLoginStore } from "../../../Store";
export default function AdminContainer() {
  const setuserRole = UserLoginStore((state) => state.setuserRole);
  const setuserRef = UserLoginStore((state) => state.setuserRef);
  const setempSOC = UserLoginStore((state) => state.setempSOC);
  const setisLoggedIn = UserLoginStore((state) => state.setisLoggedIn);
  const DoLogout = () => {
    Cookies.remove("userRole");
    Cookies.remove("userRef");
    Cookies.remove("empSOC");
    Cookies.remove("loggedIn");
    setuserRole("");
    setuserRef("");
    setempSOC("");
    setisLoggedIn(false);
    window.location.href = BASEURI;
  };
  return (
    <div>
      Admin Contianer {Cookies.get("userRole")} {Cookies.get("userRef")}
      <button onClick={DoLogout}>Logout</button>
    </div>
  );
}
