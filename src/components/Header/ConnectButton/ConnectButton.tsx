import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import cn from "classnames";
import style from "./ConnectButton.module.css";
import { useDisconnect, useAccount } from "wagmi";
import { SvgWallet } from "assets/images/svg";
import { beautifyAddress } from "utils/helpers/string.helpers";
import { useEffect, useRef, useState } from "react";
import LinkWithSearchParams from "components/LinkWithSearchParams";
import { useAdminAddress } from "utils/hooks/useAddress";

const ConnectButton = () => {
  const account = useAccount();
  const adminAddress = useAdminAddress();
  const { disconnect } = useDisconnect();

  const [expanded, setExpanded] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      {!account.isConnected && (
        <RainbowConnectButton
          // showBalance={false}
          accountStatus="address"
          // chainStatus="none"
        />
      )}

      {account.isConnected && (
        <div ref={ref} className={cn(style.root)}>
          <button
            className={cn(style.button)}
            onClick={() => setExpanded(!expanded)}
          >
            <SvgWallet />
            {beautifyAddress(account.address || "")}
          </button>

          {expanded && (
            <div className={cn(style.dropdown)}>
              {account.address === adminAddress && (
                <LinkWithSearchParams to={{ pathname: "/setting/collections" }}>
                  Admin setting
                </LinkWithSearchParams>
              )}
              <span
                onClick={() => {
                  setExpanded(false);
                  disconnect();
                }}
              >
                Log Out
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ConnectButton;
