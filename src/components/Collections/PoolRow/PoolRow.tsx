import style from "./PoolRow.module.css";
import cn from "classnames";

import {
  SvgEthereum,
  // SvgTemplateChart,
} from "assets/images/svg";

import { Button, TextCopier } from "components/ui";
import {
  beautifyAddress,
  beautifyDecimals,
  formatEther,
  toInteger,
} from "utils/helpers/string.helpers";
import { IPikachu } from "utils/typechain-types/contracts/Master.sol/Pikachu";
import { SECONDS_PER_DAY } from "utils/constants/number.contants";
import LinkWithSearchParams from "components/LinkWithSearchParams";

interface Props {
  pool: IPikachu.PoolStructOutput;
  floorPrice: number;
}

const PoolRow = ({ pool, floorPrice }: Props) => {
  return (
    <div className={cn(style.root)}>
      <div>
        {beautifyAddress(pool.owner)} <TextCopier text={pool.owner} />
      </div>
      <div>
        <span className="text-tangerine-yellow">
          {beautifyDecimals(formatEther(pool.availableAmount))}
        </span>{" "}
        / {beautifyDecimals(formatEther(pool.depositedAmount))}
        <SvgEthereum />
      </div>
      <div>{toInteger(pool.loanToValue) / 100}%</div>
      <div>{toInteger(pool.maxDuration) / SECONDS_PER_DAY} Days</div>
      <div>
        {toInteger(pool.interestCapRate) / 100}%
        <LinkWithSearchParams
          to={{ pathname: `/pool/${pool.owner}/${pool.poolId}` }}
        >
          <Button variant="yellow">
            Borrow{" "}
            {((toInteger(pool.loanToValue) / 10000) * floorPrice).toFixed()}
            <SvgEthereum />
          </Button>
        </LinkWithSearchParams>
      </div>

      <hr />
    </div>
  );
};

export default PoolRow;
