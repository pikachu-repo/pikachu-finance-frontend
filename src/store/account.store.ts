import create from "zustand";
import produce from "immer";
import alchemy from "utils/apis/alchemy.api";
import { toInteger, toString } from "utils/helpers/string.helpers";

interface NFTItem {
  contract: string;
  name: string;
  symbol: string;
  tokenId: number;
}

interface IAccountState {
  address: string;
  nfts: NFTItem[];
  initializeAccount: {
    (_address: string): Promise<any>;
  };
}

export const useAccountStore = create<IAccountState>((set, get) => ({
  address: "",
  nfts: [],
  initializeAccount: async (_address) => {
    let _nfts: NFTItem[] = [];
    console.log(_address);
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
        state.nfts = _nfts;
      })
    );
  },
}));
