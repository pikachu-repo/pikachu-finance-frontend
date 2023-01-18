import style from "./PlatformStatus.module.css";
import cn from "classnames";
import { useMemo } from "react";
import { usePools } from "utils/hooks/pikachu/usePools";
import { formatEther, toFloat } from "utils/helpers/string.helpers";

const PlatformStatus = () => {
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
          (prev, next) => toFloat(prev + formatEther(next.totalLoans)),
          0
        )} ETH`,
      },
      {
        label: "Available Liquidity:",

        value: `${pools.reduce(
          (prev, next) => toFloat(prev + formatEther(next.availableAmount)),
          0
        )} ETH`,
      },
    ],
    [pools]
  );

  return (
    <div className={cn(style.root)}>
      {platformStatus.map((status, index) => (
        <div key={index}>
          <span className="text-tangerine-yellow">{status.label}</span>
          <span>{status.value}</span>
        </div>
      ))}
    </div>
  );
};

export default PlatformStatus;
