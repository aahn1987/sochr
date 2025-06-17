import { create } from "zustand";
import Cookies from "js-cookie";
const ActionMessageStore = create((set) => ({
  snackSeverity: "info",
  sanckShow: false,
  snackMessage: "",
  setsnackMessage: (data) => set((state) => ({ snackMessage: data })),
  setsnackSeverity: (data) => set((state) => ({ snackSeverity: data })),
  setsanckShow: (data) => set((state) => ({ sanckShow: data })),
}));
export default ActionMessageStore;
