import create from "zustand";
// import produce from "immer";

interface ISettingState {
  address: string;
}

export const useSettingStore = create<ISettingState>((set, get) => ({
  address: "",
}));
