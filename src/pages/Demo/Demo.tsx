import { useEffect } from "react";
import {
  useNFT1Contract,
  useNFT2Contract,
  usePikachuContract,
} from "utils/hooks/useContract";
import { useNetwork } from "wagmi";
const Demo = () => {
  const network = useNetwork();
  const Pikachu = usePikachuContract();
  const NFT1 = useNFT1Contract();
  const NFT2 = useNFT2Contract();
  useEffect(() => {}, []);
  return (
    <div className="p-8 flex flex-col">
      <h3 className="text-3xl">
        {network.chain?.name} - {network.chain?.rpcUrls.public} -{" "}
        {network.chain?.id}
      </h3>
      <div className="flex gap-4 mt-4">
        <div className="flex-1 p-4 border-emerald-600 border-2">
          <span className="text-[14px]">Pikachu: {Pikachu.address}</span>
        </div>
        <div className="flex-1 p-4 border-emerald-600 border-2">
          <span className="text-[14px]">NFT-1: {NFT1.address}</span>
        </div>
        <div className="flex-1 p-4 border-emerald-600 border-2">
          <span className="text-[14px]">NFT-2: {NFT2.address}</span>
        </div>
      </div>
    </div>
  );
};

export default Demo;
