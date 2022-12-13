import { Pikachu__factory, TestNFT__factory } from "utils/typechain-types";
import { useSigner } from "wagmi";
import {
  useNFT1Address,
  useNFT2Address,
  usePikachuAddress,
} from "./useAddress";

// const useERC20Contract = (address: string) => {
//   const { data: signer } = useSigner();
//   // @ts-ignore
//   return Erc20__factory.connect(address, signer).deployed();
// };

export const usePikachuContract = () => {
  const { data: signer } = useSigner();
  const address = usePikachuAddress();

  // @ts-ignore
  return Pikachu__factory.connect(address, signer);
};

export const useNFT1Contract = () => {
  const { data: signer } = useSigner();
  const address = useNFT1Address();

  // @ts-ignore
  return TestNFT__factory.connect(address, signer);
};

export const useNFT2Contract = () => {
  const { data: signer } = useSigner();
  const address = useNFT2Address();

  // @ts-ignore
  return TestNFT__factory.connect(address, signer);
};
