import style from "./LoanPanel.module.css";
import cn from "classnames";

import { TLoanStruct } from "utils/hooks/pikachu/usePools";

import ImageERC721 from "assets/images/template-erc721.png";
import {
  beautifyAddress,
  toFloat,
  toInteger,
} from "utils/helpers/string.helpers";
import { SvgEthereum, SvgLink } from "assets/images/svg";
import TextCopier from "components/ui/TextCopier";
import { dateDifFromNow } from "utils/helpers/date.helpers";
import { useMemo } from "react";
import { SECONDS_PER_DAY } from "utils/constants/number.contants";
import Timer from "components/ui/Timer";
import { useAccount } from "wagmi";
import { IPikachu } from "utils/typechain-types/contracts/Master.sol/Pikachu";
import { Button } from "components/ui";

interface Props {
  pool: IPikachu.PoolStructOutput;
  loan: TLoanStruct;
}

const LoanPanel = ({ pool, loan }: Props) => {
  const account = useAccount();

  const myPool = useMemo(() => {
    return account?.address?.toLowerCase() === pool?.owner?.toLowerCase();
  }, [account, pool]);

  const myLoan = useMemo(() => {
    return account?.address?.toLowerCase() === loan?.borrower?.toLowerCase();
  }, [account, loan]);

  const loanStatus = useMemo(() => {
    const dueDate = toInteger(loan.timestamp) + toInteger(loan.duration) * 1000;
    const paybackButton = (
      <Button variant="yellow" onClick={() => alert("pay back")} sx="h-10 w-36">
        Pay Back
      </Button>
    );
    const claimNFTButton = (
      <Button
        variant="yellow"
        onClick={() => alert("claimNFTButton")}
        sx="h-10 w-36"
      >
        Claim NFT
      </Button>
    );
    switch (loan.status) {
      case 1:
        if (new Date(dueDate + SECONDS_PER_DAY * 1000) <= new Date()) {
          return {
            text: "Liquidation",
            class: cn(style.error, style.badge),
            operation: myPool ? claimNFTButton : paybackButton,
          };
        } else if (new Date(dueDate) <= new Date()) {
          return {
            text: "Grace Period",
            class: cn(style.error, style.badge),
            timer: true,
            due: new Date(dueDate + SECONDS_PER_DAY * 1000),
            operation: myLoan ? paybackButton : "",
          };
        }
        return {
          text: "Live",
          class: cn(style.warning, style.badge),
          timer: true,
          due: new Date(dueDate),
          operation: myLoan ? paybackButton : "",
        };
      case 2:
        return {
          text: "Loan Funded",
          class: cn(style.error, style.badge),
          operation: "Closed 5 days ago",
        };
      case 3:
        return {
          text: "Liquidated",
          class: cn(style.error, style.badge),
          operation: "Closed 5 days ago",
        };
      default:
        return {
          text: "None",
          class: cn(style.error, style.badge),
          operation: "Closed 5 days ago",
        };
    }
  }, [loan, myLoan, myPool]);

  return (
    <div className={cn(style.root)}>
      <div className={cn(style.collection)}>
        <img src={ImageERC721} alt="erc721" />
        <div>
          <a
            className={cn(style.collectionName)}
            href={`https://opensea.io/assets/ethereum/${loan.collectionContract}/${loan.tokenId}`}
            target="_blank"
            rel="noreferrer"
          >
            Pudgy Penguins
            <SvgLink />
          </a>
          Pudgy Penguin #{toInteger(loan.tokenId)}
        </div>
      </div>
      <div className={cn(style.borrower)}>
        {beautifyAddress(loan.borrower)} <TextCopier text={loan.borrower} />
      </div>

      <div className={cn(style.interest)}>
        {toFloat(loan.amount)} <SvgEthereum />
      </div>
      <div>{toFloat(loan.interestStartRate)} %</div>
      <div>
        {dateDifFromNow(
          new Date(toInteger(loan.timestamp) + toInteger(loan.duration) * 1000)
        )}
      </div>
      <div className={cn(style.status)}>
        <div className={loanStatus.class}>{loanStatus.text}</div>
        {loanStatus.timer && (
          <div className={style.timer}>
            <Timer dueDate={loanStatus.due} />
          </div>
        )}
      </div>

      <div className={cn(style.operation)}>{loanStatus.operation}</div>
    </div>
  );
};

export default LoanPanel;
