import style from "./Pools.module.css";
import cn from "classnames";
import { SvgLink, SvgRefresh, SvgArrowDown } from "assets/images/svg";
import { usePools } from "utils/hooks/pikachu/usePools";
import { PoolPanel } from "components/Borrow";
import PlatformStatus from "components/Common/PlatformStatus";
// import Example from "assets/"
const Pools = () => {
  const pools = usePools();

  return (
    <div className={cn(style.root)}>
      <div className={cn(style.heading)}>
        <h3>Borrow</h3>
        <PlatformStatus />
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
          <PoolPanel
            key={index}
            pool={pool}
            poolIndex={index}
            buttonVisible={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Pools;
