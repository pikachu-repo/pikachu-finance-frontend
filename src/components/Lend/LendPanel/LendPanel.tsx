import React, { useMemo, useState } from "react";
import style from "./LendPanel.module.css";
import cn from "classnames";

import { IPikachu } from "utils/typechain-types/contracts/Master.sol/Pikachu";
import {
  beautifyAddress,
  beautifyDecimals,
  formatEther,
  toFloat,
  toInteger,
} from "utils/helpers/string.helpers";
import {
  SvgArrowDown,
  SvgCopy,
  SvgEdit,
  SvgEthereum,
  SvgMoveDown,
  SvgMoveUp,
  SvgPause,
  SvgResume,
} from "assets/images/svg";
// import ImageERC721 from "assets/images/template-erc721.png";
// import { SECONDS_PER_DAY } from "utils/constants/number.contants";
// import { INTEREST_TYPE } from "utils/constants/contact.constants";
import { Button } from "components/ui";
import { useLoansByPoolId } from "utils/hooks/pikachu/usePools";
import { LoanPanel } from "components/Pool";
import WithdrawModal from "../WithdrawModal";
import TopupModal from "../TopupModal";
import ToggleModal from "../ToggleModal";
import { useAccountStore } from "store";
// import LinkWithSearchParams from "components/LinkWithSearchParams";

interface Props {
  pool: IPikachu.PoolStructOutput;
  onEditPool: any;
}

const LendPanel = ({ pool, onEditPool }: Props) => {
  const loans = useLoansByPoolId(toInteger(pool.poolId));
  const [expanded, setExpanded] = useState(false);

  const [withdrawVisible, setWithdrawVisible] = useState(false);
  const [topupVisible, setTopupVisible] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);

  const { allLoans } = useAccountStore();
  const openLoans = useMemo(() => {
    return allLoans.filter(
      (item) => item.poolId === toInteger(pool.poolId) && item.status === 1
    );
  }, [allLoans, pool]);

  return (
    <div className={cn(style.root)}>
      <>
        <WithdrawModal
          visible={withdrawVisible}
          setVisible={setWithdrawVisible}
          pool={pool}
        />
        <TopupModal
          visible={topupVisible}
          setVisible={setTopupVisible}
          pool={pool}
        />
        <ToggleModal
          visible={toggleModal}
          setVisible={setToggleModal}
          pool={pool}
        />
      </>
      <div className={cn(style.poolInfo)}>
        <span>
          {beautifyAddress(pool.owner)}
          <SvgCopy />
        </span>
        <span>
          <span className="text-tangerine-yellow">
            {beautifyDecimals(pool.availableAmount)}
          </span>
          /{" "}
          {beautifyDecimals(
            formatEther(pool.availableAmount) +
              openLoans.reduce(
                (prev, next) => prev + formatEther(next.amount),
                0
              )
          )}
          <SvgEthereum />
        </span>
        <span>{toFloat(pool.loanToValue) / 100}%</span>
        <span>
          {beautifyDecimals(pool.totalInterest)} <SvgEthereum />
        </span>
        <span>{pool.numberOfLoans.toNumber()}</span>
        <span className={cn(style.actions)}>
          <div className={cn("tooltip-container")}>
            <span className={cn(style.tooltip, "tooltip top")}>
              Top up this pool
            </span>
            <Button onClick={() => setTopupVisible(true)}>
              <SvgMoveUp />
            </Button>
          </div>
          <div className={cn("tooltip-container")}>
            <span className={cn(style.tooltip, "tooltip top")}>
              Withdraw from Pool
            </span>
            <Button onClick={() => setWithdrawVisible(true)}>
              <SvgMoveDown />
            </Button>
          </div>
          <div className={cn("tooltip-container")}>
            <span className={cn(style.tooltip, "tooltip top")}>
              {pool.paused ? "Resume" : "Pause"}
            </span>
            <Button onClick={() => setToggleModal(true)}>
              {pool.paused ? <SvgResume /> : <SvgPause />}
            </Button>
          </div>
          <div className={cn("tooltip-container")}>
            <span className={cn(style.tooltip, "tooltip top")}>
              Update configuration
            </span>
            <Button onClick={onEditPool}>
              <SvgEdit />
            </Button>
          </div>
        </span>
        <span>
          <Button
            sx={`h-10 w-10 bg-white/30 hover:bg-white/40 ml-auto ${
              expanded ? "rotate-180" : ""
            }`}
            onClick={() => setExpanded(!expanded)}
          >
            <SvgArrowDown />
          </Button>
        </span>
      </div>

      {expanded && (
        <div className={cn(style.loanlist)}>
          <div className={cn(style.header)}>
            <span>NFT</span>
            <span>Borrower</span>
            <span>Amount + Interest</span>
            <span>APY</span>
            <span>Fund Date</span>
            <span>Status</span>
            <span></span>
          </div>

          {pool &&
            loans.map((loan, index) => (
              <React.Fragment key={index}>
                <LoanPanel loan={loan} pool={pool} />
                <div className={cn(style.hr)} />
              </React.Fragment>
            ))}
        </div>
      )}
    </div>
  );
};

export default LendPanel;
