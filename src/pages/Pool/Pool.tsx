import style from "./Pool.module.css";
import cn from "classnames";
import BackButton from "components/ui/BackButton";
import { SvgLink, SvgRefresh } from "assets/images/svg";
import { useParams } from "react-router-dom";
import { useLoans, usePoolById } from "utils/hooks/pikachu/usePools";
import {
  beautifyAddress,
  toInteger,
  toString,
} from "utils/helpers/string.helpers";
import { PoolPanel } from "components/Borrow";
import { Button } from "components/ui";
import LoanPanel from "components/Borrow/LoanPanel";
import { useMemo } from "react";
import { useAccount } from "wagmi";
import LinkWithSearchParams from "components/LinkWithSearchParams";

const Pool = () => {
  const account = useAccount();
  const { poolId } = useParams();
  const pool = usePoolById(toInteger(poolId));
  const loans = useLoans(toInteger(poolId));

  const myPool = useMemo(() => {
    return account?.address?.toLowerCase() === pool?.owner?.toLowerCase();
  }, [account, pool]);

  return (
    <div className={cn(style.root)}>
      <div className={cn(style.heading)}>
        <BackButton />
        <h3>{beautifyAddress(toString(pool?.owner))}'s Pool</h3>

        <a
          href="https://github.com/Pikachu-finance"
          target="_blank"
          rel="noreferrer"
          className={cn(style.link)}
        >
          Share Link
          <SvgLink />
        </a>

        {!myPool && (
          <LinkWithSearchParams to={{ pathname: `borrow` }} className="ml-auto">
            <Button variant="yellow" sx="h-10 w-36">
              Borrow Now
            </Button>
          </LinkWithSearchParams>
        )}
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
        All loans of the pool ({pool?.numberOfLoans.toNumber()})
      </h4>
      <div className={cn(style.loanPanel)}>
        <div className={cn(style.head)}>
          <span>NFT</span>
          <span>Borrower</span>
          <span>Amount + Interest</span>
          <span>Interest</span>
          <span>Fund Date</span>
          <span>Status</span>
          <span>
            <SvgRefresh />
            Refresh
          </span>
        </div>

        {loans.map((loan, index) => (
          <LoanPanel
            key={index}
            loan={loan}
            pool={pool}
            poolId={toInteger(poolId)}
          />
        ))}
      </div>
    </div>
  );
};

export default Pool;
