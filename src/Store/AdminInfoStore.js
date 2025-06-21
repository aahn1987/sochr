import { create } from "zustand";
const AdminInfoStore = create((set) => ({
  adminData: [],
  adminList: [],
  adminInfo: [],
  adminLoading: false,
  setadminData: (data) => set((state) => ({ adminData: data })),
  setAdminList: (data) => set((state) => ({ adminList: data })),
  setAdminInfo: (data) => set((statte) => ({ adminInfo: data })),
}));
export default AdminInfoStore;
