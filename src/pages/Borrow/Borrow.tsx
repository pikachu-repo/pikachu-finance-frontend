import style from "./Borrow.module.css";
import cn from "classnames";
import { useState } from "react";
// import { useAccount } from "wagmi";
import { useParams } from "react-router-dom";
import { usePoolById } from "utils/hooks/pikachu/usePools";
import { toInteger } from "utils/helpers/string.helpers";
import { SvgEthereum, SvgRefresh, SvgWarning } from "assets/images/svg";
import nftImage from "assets/images/nftImage.png";
import DurationPicker from "components/ui/DurationPicker";
import { SECONDS_PER_DAY } from "utils/constants/number.contants";
import LinkWithSearchParams from "components/LinkWithSearchParams";
import { Button } from "components/ui";
import NFTSelector from "components/Borrow/NFTSelector";

const Borrow = () => {
  // const account = useAccount();
  const { poolId } = useParams();
  const pool = usePoolById(toInteger(poolId));

  const [duration, setDuration] = useState(1);

  return (
    <div className={cn(style.root)}>
      <div className={cn(style.heading)}>
        <h3>Borrow</h3>

        <span>
          <SvgRefresh />
          Refresh
        </span>
      </div>

      <p>
        Select the NFT you want to collaterize, loan to value is 40% in this
        pool.
      </p>

      <div className={cn(style.collection)}>
        <img src={nftImage} alt="collection" className={cn(style.nftImg)} />
        <div className={cn(style.sellections)}>
          <NFTSelector pool={pool} />
          <div>
            Floor Price:
            <h4 className="ml-2 mr-1.5">60.5</h4>
            <SvgEthereum />
          </div>
          <div>
            Borrow Amount (Max 200 ETH):
            <h3 className="ml-2 mr-1.5 text-[30px]">24.5</h3>
            <SvgEthereum />
          </div>
          <div className={cn(style.duration)}>
            Select your loan duration (Max{" "}
            {toInteger(pool?.maxDuration) / SECONDS_PER_DAY} days):
            <DurationPicker
              value={duration}
              onChange={setDuration}
              min={1}
              max={toInteger(pool?.maxDuration) / SECONDS_PER_DAY}
            />
          </div>
          <div>
            Estimated interest:
            <h4 className="ml-2 mr-1.5">4.5</h4>
            <SvgEthereum />
          </div>
        </div>
      </div>

      <div className={cn(style.warnings)}>
        <div>
          <SvgWarning /> You don't have any NFTs from verified collections.
        </div>
        <div>
          <SvgWarning /> Your balance is 0.0020392 ETH, and at least 0.001 ETH
          (including transaction fees) is required.
        </div>

        <LinkWithSearchParams
          to={{ pathname: "/" }}
          className="text-tangerine-yellow"
        >
          By clicking Borrow you agree with the above terms.
        </LinkWithSearchParams>
      </div>

      <div className={cn(style.buttons)}>
        <Button variant="gray" sx="h-10 w-44">
          Cancel
        </Button>
        <Button variant="yellow" sx="h-10 w-44">
          Request 30.25 <SvgEthereum className="ml-1.5" />
        </Button>
      </div>
    </div>
  );
};

export default Borrow;
