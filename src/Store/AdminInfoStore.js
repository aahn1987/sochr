import { create } from "zustand";
const AdminInfoStore = create((set) => ({
  adminData: [],
  setadminData: (data) => set((state) => ({ adminData: data })),
}));
export default AdminInfoStore;
