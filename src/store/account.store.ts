import create from "zustand";
import produce from "immer";
import alchemy from "utils/apis/alchemy.api";
import { toInteger, toString } from "utils/helpers/string.helpers";

export interface NFTItem {
  contract: string;
  name: string;
  symbol: string;
  tokenId: number;
  floorPrice?: number;
}

interface IAccountState {
  address: string;
  balance: number;
  nfts: NFTItem[];
  initializeAccount: {
    (_balance: number, _address: string): Promise<any>;
  };
}

export const useAccountStore = create<IAccountState>((set, get) => ({
  address: "",
  balance: 0,
  nfts: [],
  initializeAccount: async (_balance, _address) => {
    let _nfts: NFTItem[] = [];
    if (_address) {
      const nftsForOwner = await alchemy.nft.getNftsForOwner(_address);

      _nfts = nftsForOwner.ownedNfts.map((nft) => ({
        contract: nft.contract.address,
        name: toString(nft.contract.name),
        symbol: toString(nft.contract.symbol),
        tokenId: toInteger(nft.tokenId),
      }));
    }
    set(
      produce((state: IAccountState) => {
        state.address = _address;
        state.balance = _balance;
        state.nfts = _nfts;
      })
    );
  },
}));
