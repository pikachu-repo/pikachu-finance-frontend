import create from "zustand";
import produce from "immer";
import alchemy from "utils/apis/alchemy.api";
import { toInteger, toString } from "utils/helpers/string.helpers";
import { TLoanStruct } from "utils/hooks/pikachu/usePools";

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
  loans: TLoanStruct[];
  initializeAccount: {
    (_balance: number, _address: string, _loans: TLoanStruct[]): Promise<any>;
  };
}

export const useAccountStore = create<IAccountState>((set, get) => ({
  address: "",
  balance: 0,
  nfts: [],
  loans: [],
  initializeAccount: async (_balance, _address, _loans) => {
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
        state.loans = _loans;
      })
    );
  },
}));
