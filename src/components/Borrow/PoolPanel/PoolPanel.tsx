import { useState } from "react";
import { BigNumber, ethers } from "ethers";
import style from "./PoolPanel.module.css";
import cn from "classnames";

import { IPikachu } from "utils/typechain-types/contracts/Master.sol/Pikachu";
import { beautifyAddress, toInteger } from "utils/helpers/string.helpers";
import {
  SvgArrowDown,
  SvgCopy,
  SvgEthereum,
  SvgTemplateChart,
} from "assets/images/svg";
import ImageERC721 from "assets/images/template-erc721.png";
import { SECONDS_PER_DAY } from "utils/constants/number.contants";
import {
  INTEREST_TYPE,
  POOL_DISABLED,
  POOL_READY,
} from "utils/constants/contact.constants";
import { Button } from "components/ui";
import LinkWithSearchParams from "components/LinkWithSearchParams";

interface Props {
  pool: IPikachu.PoolStructOutput;
  poolIndex: number;
  buttonVisible: boolean;
}

const PoolPanel = ({ pool, poolIndex, buttonVisible }: Props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={cn(style.root)}>
      <div className={cn(style.poolInfo)}>
        <span>
          {beautifyAddress(pool.owner)}
          <SvgCopy />
        </span>
        <span>
          <span className="text-tangerine-yellow">
            {ethers.utils.formatEther(pool.availableAmount)}
          </span>
          / {ethers.utils.formatEther(pool.depositedAmount)}
          <SvgEthereum />
        </span>
        <span>{pool.loanToValue.toString()}%</span>
        <span>{pool.maxDuration.toNumber() / SECONDS_PER_DAY} Days</span>
        <span>
          <span className="text-tangerine-yellow">
            {pool.interestStartRate.toNumber() / 100}
          </span>
          / {pool.interestCapRate.toNumber() / 100}%
        </span>
        <span>
          {buttonVisible && (
            <>
              {pool.status === POOL_READY &&
              pool.availableAmount.gt(BigNumber.from(0)) ? (
                <LinkWithSearchParams
                  to={{ pathname: `/pool/${pool.owner}/${poolIndex}` }}
                >
                  <Button variant="yellow" sx="h-10 w-36">
                    Borrow Now
                  </Button>
                </LinkWithSearchParams>
              ) : (
                <Button variant="gray" sx="h-10 w-36" disabled>
                  Insufficient
                </Button>
              )}
              {pool.status === POOL_DISABLED && (
                <Button variant="gray" sx="h-10 w-36" disabled>
                  Paused
                </Button>
              )}
            </>
          )}
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
        <div className={cn(style.poolDetails)}>
          <div className={cn(style.loanInfo)}>
            <div>
              <span>Loans made: </span>
              <span>{toInteger(pool.numberOfLoans)}</span>
            </div>
            <div>
              <span>Open loans: </span>
              <span>{toInteger(pool.numberOfOpenLoans)}</span>
            </div>
            <div>
              <span>Liquidations: </span>
              <span>{toInteger(pool.numberOfLiquidations)}</span>
            </div>
            <div>
              <span>Max duration: </span>
              <span>{pool.maxDuration.toNumber() / SECONDS_PER_DAY} Days</span>
            </div>
            <div>
              <span>Max amount: </span>
              <span>
                {ethers.utils.formatEther(pool.maxAmount)}
                <SvgEthereum />
              </span>
            </div>
          </div>
          <div className={cn(style.loanDetails)}>
            <div className={cn(style.interestInfo)}>
              <div>
                <div>
                  <span>Interest type:</span>
                  <span>{INTEREST_TYPE[pool.interestType]}</span>
                </div>
                <div>
                  <span>Interest earned:</span>
                  <span>
                    {ethers.utils.formatEther(pool.totalInterest)} ETH
                  </span>
                </div>
              </div>
              <SvgTemplateChart />
            </div>
            <div className={cn(style.collectionsInfo)}>
              <div className={cn(style.collectionsCount)}>
                <span>Supported collections:</span>
                <span>{pool.collections.length}</span>
              </div>

              <div className={cn(style.collectionsList)}>
                {pool.collections.map((collection, index) => (
                  <img key={index} src={ImageERC721} alt="erc721" />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoolPanel;
