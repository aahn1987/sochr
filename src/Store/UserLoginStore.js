import { create } from "zustand";
import Cookies from "js-cookie";
const UserLoginStore = create((set) => ({
  userRole: Cookies.get("userRole"),
  userRef: Cookies.get("userRef"),
  empSOC: Cookies.get("empSOC"),
  isLoggedIn: Cookies.get("loggedIn"),
  setuserRole: (data) => set((state) => ({ userRole: data })),
  setuserRef: (data) => set((state) => ({ userRef: data })),
  setempSOC: (data) => set((state) => ({ empSOC: data })),
  setisLoggedIn: (data) => set((state) => ({ isLoggedIn: data })),
}));
export default UserLoginStore;
