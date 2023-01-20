import { useMemo, useState } from "react";
import { BigNumber, ethers } from "ethers";
import style from "./PoolPanel.module.css";
import cn from "classnames";

import { IPikachu } from "utils/typechain-types/contracts/Master.sol/Pikachu";
import {
  beautifyAddress,
  formatEther,
  toFloat,
  toInteger,
} from "utils/helpers/string.helpers";
import {
  SvgArrowDown,
  SvgCopy,
  SvgEthereum,
  // SvgTemplateChart,
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
import { calculateRepayAmount } from "utils/helpers/contract.helpers";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  pool: IPikachu.PoolStructOutput;
  poolId: number;
  buttonVisible: boolean;
}

const PoolPanel = ({ pool, poolId, buttonVisible }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const data = useMemo(() => {
    const {
      interestType: dynamicInterest,
      interestStartRate: interestStarting,
      interestCapRate: interestCap,
    } = pool;

    const days = [1, 3, 5, 7, 9, 11, 13];
    const interests = days.map((day) => {
      return calculateRepayAmount(
        1,
        Number(dynamicInterest),
        toFloat(interestStarting),
        toFloat(interestCap),
        day * SECONDS_PER_DAY
      );
    });
    return days.map((day, index) => ({
      name: `${day}d`,
      interest: (interests[index] - 1) * 100,
    }));
  }, [pool]);

  return (
    <div className={cn(style.root)}>
      <div className={cn(style.poolInfo)}>
        <span>
          {beautifyAddress(pool.owner)}
          <SvgCopy />
        </span>
        <span>
          <span className="text-tangerine-yellow">
            {formatEther(pool.availableAmount).toFixed(3)}
          </span>
          / {formatEther(pool.depositedAmount).toFixed(3)}
          <SvgEthereum />
        </span>
        <span>{toFloat(pool.loanToValue) / 100}%</span>
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
                  to={{ pathname: `/pool/${pool.owner}/${poolId}` }}
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
                  <span>{formatEther(pool.totalInterest).toFixed(4)} ETH</span>
                </div>
              </div>
              <div className={cn(style.chart)}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis interval="preserveStart" />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className={cn(style.chart_tooltip)}>
                              {`${label} loan interest : ${Number(
                                payload[0].value
                              ).toFixed(2)}%`}
                            </div>
                          );
                        }

                        return null;
                      }}
                    />
                    <Area
                      dot={{
                        stroke: "#FFCC01",
                        fill: "#FFF",
                        strokeWidth: 2,
                        r: 4,
                        strokeDasharray: "",
                      }}
                      dataKey="interest"
                      stroke="#FFCC01"
                      fill="#FFCC0180"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
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
