import { useMemo } from "react";
import style from "./Borrow.module.css";
import cn from "classnames";
import { SvgLink, SvgRefresh, SvgArrowDown } from "assets/images/svg";
import { usePools } from "utils/hooks/pikachu/usePools";
import { ethers } from "ethers";
import { toFloat } from "utils/helpers/string.helpers";
import { PoolPanel } from "components/Borrow";
// import Example from "assets/"
const Borrow = () => {
  const pools = usePools();

  const platformStatus = useMemo(
    () => [
      {
        label: "Total Pools:",
        value: pools.length,
      },
      {
        label: "Total Open Loans:",
        value: `${pools.reduce(
          (prev, next) =>
            toFloat(prev + ethers.utils.formatEther(next.totalLoans)),
          0
        )} ETH`,
      },
      {
        label: "Available Liquidity:",

        value: `${pools.reduce(
          (prev, next) =>
            toFloat(prev + ethers.utils.formatEther(next.availableAmount)),
          0
        )} ETH`,
      },
    ],
    [pools]
  );

  return (
    <div className={cn(style.root)}>
      <div className={cn(style.heading)}>
        <h3>Borrow</h3>
        <div className={cn(style.platformStatus)}>
          {platformStatus.map((status, index) => (
            <div key={index}>
              <span className="text-tangerine-yellow">{status.label}</span>
              <span>{status.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={cn(style.help)}>
        Borrow ETH with your NFTs within 5 minutes and get instant NFT Liquidity
        on Ethereum.
        <a
          href="https://github.com/Pikachu-finance"
          target="_blank"
          rel="noreferrer"
        >
          How to use PIKACHU.FI
          <SvgLink />
        </a>
      </div>

      <div className={cn(style.poolList)}>
        <div className={cn(style.head)}>
          <h4>Pools ({pools.length})</h4>
          <span>
            <span className="text-tangerine-yellow">Available Liquidity</span>
            / Total
            <SvgArrowDown />
          </span>
          <span>
            LTV
            <SvgArrowDown />
          </span>
          <span>
            Duration
            <SvgArrowDown />
          </span>
          <span>
            <span className="text-tangerine-yellow">Starting</span>
            / Daily Interest
            <SvgArrowDown />
          </span>
          <span>
            <SvgRefresh />
            Refresh
          </span>
        </div>

        {pools.map((pool, index) => (
          <PoolPanel key={index} pool={pool} poolIndex={index} />
        ))}
      </div>
    </div>
  );
};

export default Borrow;
