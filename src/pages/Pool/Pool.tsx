import style from "./Pool.module.css";
import cn from "classnames";
import BackButton from "components/ui/BackButton";
import { SvgLink, SvgRefresh } from "assets/images/svg";
import { useParams } from "react-router-dom";
import { usePoolById } from "utils/hooks/pikachu/usePools";
import {
  beautifyAddress,
  toInteger,
  toString,
} from "utils/helpers/string.helpers";
import { PoolPanel } from "components/Borrow";
import { Button } from "components/ui";
// import Example from "assets/"
const Pool = () => {
  const { poolId } = useParams();
  const pool = usePoolById(toInteger(poolId));
  return (
    <div className={cn(style.root)}>
      <div className={cn(style.heading)}>
        <BackButton />
        <h3>{beautifyAddress(toString(pool?.owner))}'s Pool</h3>

        <a
          href="https://github.com/Pikachu-finance"
          target="_blank"
          rel="noreferrer"
        >
          Share Link
          <SvgLink />
        </a>

        <Button variant="yellow" sx="h-10 w-36 ml-auto">
          Borrow Now
        </Button>
      </div>

      <div className={cn(style.poolPanel)}>
        <div className={cn(style.head)}>
          <h4>Pool Contract</h4>
          <span>
            <span className="text-tangerine-yellow">Available Liquidity</span>/
            Total
          </span>
          <span>LTV</span>
          <span>Duration</span>
          <span>
            <span className="text-tangerine-yellow">Starting</span>/ Daily
            Interest
          </span>
          <span>
            <SvgRefresh />
            Refresh
          </span>
        </div>

        {pool && (
          <PoolPanel
            pool={pool}
            poolIndex={toInteger(poolId)}
            buttonVisible={false}
          />
        )}
      </div>

      <h4 className={cn(style.loanHeading)}>
        All loans of the pool ({pool?.totalLoans.toNumber()})
      </h4>
      <div className={cn(style.loanPanel)}></div>
    </div>
  );
};

export default Pool;
