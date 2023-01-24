import style from "./PlatformStatus.module.css";
import cn from "classnames";
import { useMemo } from "react";
import {
  beautifyDecimals,
  formatEther,
  toFloat,
} from "utils/helpers/string.helpers";
import { useAccountStore, useSettingStore } from "store";

const PlatformStatus = () => {
  const { etherusd } = useSettingStore();
  const { pools } = useAccountStore();

  const platformStatus = useMemo(() => {
    const availableLiquidity = pools.reduce(
      (prev, next) => toFloat(prev + formatEther(next.availableAmount)),
      0
    );

    return [
      {
        label: "Total Pools:",
        value: pools.length,
      },
      {
        label: "Total Open Loans:",
        value: `${beautifyDecimals(
          pools.reduce(
            (prev, next) => toFloat(prev + formatEther(next.totalLoans)),
            0
          )
        )} ETH`,
      },
      {
        label: "Available Liquidity:",

        value: `${beautifyDecimals(availableLiquidity)} ETH ($${(
          etherusd * availableLiquidity
        ).toFixed()})`,
      },
    ];
  }, [pools, etherusd]);

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
