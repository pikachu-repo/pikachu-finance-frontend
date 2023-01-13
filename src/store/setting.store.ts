import create from "zustand";
import produce from "immer";
import { TAdminSettingStruct } from "utils/hooks/pikachu/useAdminSetting";
import axios from "axios";
import { API_URL } from "utils/constants/api.constants";
import { ethers } from "ethers";

interface ISettingState {
  setting: TAdminSettingStruct;
  collections: ICollection[];
  initializeSetting: {
    (_setting: TAdminSettingStruct): Promise<void>;
  };
  replaceCollection: {
    (_old: string, _new: string): Promise<void>;
  };
}

interface ICollection {
  contract: string;
  name: string;
  symbol: string;
  imageUrl?: string;
  externalUrl?: string;
  description?: string;
  totalSupply: number;
  floorPrice: number;
  contractDeployer?: string;
  deployedBlockNumber?: number;
}

export const useSettingStore = create<ISettingState>((set, get) => ({
  setting: {
    blockNumberSlippage: 0,
    feeTo: "",
    minDepositAmount: 0,
    platformFee: 0,
    verifiedCollections: [],
  },
  collections: [],

  initializeSetting: async (_setting) => {
    if (_setting.feeTo === "" || get().setting.feeTo === _setting.feeTo) return;
    const _response = await axios.post(`${API_URL}/pools/collections`, {
      verifiedCollections: _setting.verifiedCollections.map((item) =>
        item.toLowerCase()
      ),
    });
    set(
      produce((state: ISettingState) => {
        state.setting = _setting;
        state.collections = _response.data;
      })
    );
  },

  replaceCollection: async (_old, _new) => {
    if (_new === "") {
      set(
        produce((state: ISettingState) => {
          state.setting.verifiedCollections =
            state.setting.verifiedCollections.filter(
              (_item) => _item.toLowerCase() !== _old.toLowerCase()
            );
        })
      );
      set(
        produce((state: ISettingState) => {
          state.collections = state.collections.filter(
            (_item) => _item.contract !== _old
          );
        })
      );
      return;
    }
    if (!ethers.utils.isAddress(_new)) return;
    if (_old === "") {
      const _response = await axios.get(`${API_URL}/pools/collection/${_new}`);

      set(
        produce((state: ISettingState) => {
          state.setting.verifiedCollections.push(_new);
        })
      );

      set(
        produce((state: ISettingState) => {
          state.collections.push(_response.data);
        })
      );
    }
  },
}));
