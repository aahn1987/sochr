import { create } from "zustand";
import Cookies from "js-cookie";
const UserLoginStore = create((set) => ({
  userRole: Cookies.get("userRole"),
  userRef: Cookies.get("userRef"),
  empSOC: Cookies.get("empSOC"),
  isLoggedIn: Cookies.get("loggedIn"),
  setuserRole: (role) => set((state) => ({ userRole: role })),
  setuserRef: (ref) => set((state) => ({ userRef: ref })),
  setempSOC: (soc) => set((state) => ({ empSOC: soc })),
  setisLoggedIn: (loggedIn) => set((state) => ({ isLoggedIn: loggedIn })),
}));
export default UserLoginStore;
