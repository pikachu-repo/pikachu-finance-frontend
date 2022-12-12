import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import cn from "classnames";
import style from "./ConnectButton.module.css";
import { useAccount } from "wagmi";
import { SvgWallet } from "assets/images/svg";
import { beautifyAddress } from "utils/helpers/string.helpers";
import { useProvider } from "wagmi";
import { useEffect } from "react";
const ConnectButton = () => {
  const account = useAccount();
  const provider = useProvider();
  useEffect(() => {
    provider.getBlockNumber().then(console.log);
  }, [provider]);
  return (
    <>
      {!account.isConnected && (
        <RainbowConnectButton
          showBalance={false}
          accountStatus="address"
          chainStatus="none"
        />
      )}

      {account.isConnected && (
        <button className={cn(style.root)}>
          <SvgWallet />
          {beautifyAddress(account.address || "")}
        </button>
      )}
    </>
  );
};

export default ConnectButton;
