// import { useState } from "react";
import { useSettingStore } from "store";

import style from "./PoolSetting.module.css";
import cn from "classnames";
import { Button } from "components/ui";
import { ethers } from "ethers";
import { SvgEthereum } from "assets/images/svg";

const PoolSetting = () => {
  const { setting } = useSettingStore();
  return (
    <div className={cn(style.root)}>
      <></>

      <div className={cn(style.fee)}>
        <span className={cn(style.label)}>Fee Settings</span>

        <div className={cn(style.row)}>
          <span className={cn(style.label)}>Fee Receiving Address</span>
          <span className={cn(style.value)}>{setting.feeTo}</span>
          <Button variant="yellow">Edit</Button>
        </div>

        <div className={cn(style.row)}>
          <span className={cn(style.label)}>Platform Fee</span>
          <span className={cn(style.value)}>{setting.platformFee / 100}%</span>
          <Button variant="yellow">Edit</Button>
        </div>
      </div>
      <div className={cn(style.pool)}>
        <span className={cn(style.label)}>Pool Settings</span>

        <div className={cn(style.row)}>
          <span className={cn(style.label)}>Min Deposit Amount</span>
          <span className={cn(style.value)}>
            {ethers.utils.formatEther(setting.minDepositAmount)} <SvgEthereum />
          </span>
          <Button variant="yellow">Edit</Button>
        </div>
      </div>
      <div className={cn(style.block)}>
        <span className={cn(style.label)}>Basic Settings</span>

        <div className={cn(style.row)}>
          <span className={cn(style.label)}>Block Number Slippage</span>
          <span className={cn(style.value)}>{setting.blockNumberSlippage}</span>
          <Button variant="yellow">Edit</Button>
        </div>
      </div>
    </div>
  );
};

export default PoolSetting;
