import { SvgLink } from "assets/images/svg";
import cn from "classnames";
import style from "./Lend.module.css";

import { Button, Refresh } from "components/ui";

import { refreshPools } from "utils/apis/pikachu.api";
import { usePoolByOwner } from "utils/hooks/pikachu/usePools";
import { useAccount } from "wagmi";
import { toString } from "utils/helpers/string.helpers";
import { LendPanel, PoolCreateDrawer } from "components/Lend";
import { useState } from "react";

const Lend = () => {
  const account = useAccount();
  const pools = usePoolByOwner(toString(account.address));

  const [createModalVisible, setCreateModalVisible] = useState(false);

  return (
    <div className={cn(style.root)}>
      {createModalVisible ? (
        <PoolCreateDrawer setVisible={setCreateModalVisible} />
      ) : (
        <>
          <div className={cn(style.heading)}>
            <h3>Lend</h3>

            <div className={cn(style.help)}>
              Create a pool in 5 minutes and provide instant NFT Liquidity on
              Ethereum.
              <a
                href="https://github.com/Pikachu-finance"
                target="_blank"
                rel="noreferrer"
              >
                How to create
                <SvgLink />
              </a>
              <Button
                variant="yellow"
                onClick={() => setCreateModalVisible(true)}
              >
                Create Pool
              </Button>
            </div>
          </div>

          <div className={cn(style.poolList)}>
            <div className={cn(style.head)}>
              <h4>Pools ({pools.length})</h4>
              <span>
                <span className="text-tangerine-yellow">
                  Available Liquidity
                </span>
                / Total
              </span>
              <span>LTV</span>
              <span>Interest</span>
              <span>Open loans</span>
              <span>Operation</span>
              <span>
                <Refresh action={refreshPools} />
              </span>
            </div>

            {pools.map((pool, index) => (
              <LendPanel pool={pool} key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Lend;
