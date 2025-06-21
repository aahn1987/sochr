import { create } from "zustand";
const IOMHRStore = create((set) => ({
  HRData: [],
  HRList: [],
  HRInfo: [],
  HRLoading: false,
  setHRData: (data) => set((state) => ({ HRData: data })),
  setHRList: (data) => set((state) => ({ HRList: data })),
  setHRInfo: (data) => set((statte) => ({ HRInfo: data })),
}));
export default IOMHRStore;
