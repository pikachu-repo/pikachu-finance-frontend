import { useState } from "react";

import cn from "classnames";
import style from "./Refresh.module.css";

import { SvgRefresh } from "assets/images/svg";

interface IProps {
  action: any;
}

const Refresh = ({ action }: IProps) => {
  const [busy, setBusy] = useState(false);
  const onRefresh = async () => {
    setBusy(true);
    await action();
    setBusy(false);
  };
  return (
    <div className={cn(style.root)} onClick={onRefresh}>
      <SvgRefresh className={cn(busy ? style.busy : "")} />
      Refresh
    </div>
  );
};

export default Refresh;
