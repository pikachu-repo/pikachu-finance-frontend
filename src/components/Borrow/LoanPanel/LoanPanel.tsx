import cn from "classnames";
import style from "./LoanPanel.module.css";

import {
  TLoanStruct,
  useCalculateRepayAmount,
} from "utils/hooks/pikachu/usePools";

import ImageERC721 from "assets/images/template-erc721.png";
import {
  beautifyAddress,
  formatEther,
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
import { useSettingStore } from "store";
import { usePikachuContract } from "utils/hooks/useContract";
import { ethers } from "ethers";
import { refreshPools } from "utils/apis/pikachu.api";

interface Props {
  pool?: IPikachu.PoolStructOutput;
  loan: TLoanStruct;
}

const LoanPanel = ({ pool, loan }: Props) => {
  const account = useAccount();
  const Pikachu = usePikachuContract();

  const {
    setTxConfirmationModalVisible,
    setTxDescription,
    submitTransaction,
    collections,
  } = useSettingStore();

  const myPool = useMemo(() => {
    return account?.address?.toLowerCase() === pool?.owner?.toLowerCase();
  }, [account, pool]);

  const myLoan = useMemo(() => {
    return account?.address?.toLowerCase() === loan?.borrower?.toLowerCase();
  }, [account, loan]);

  const collection = useMemo(
    () =>
      collections.find(
        (item) =>
          item.contract?.toLowerCase() ===
          loan.collectionContract?.toLowerCase()
      ),
    [collections, loan]
  );

  const repayAmount = useCalculateRepayAmount(
    toFloat(loan.amount),
    loan?.interestType,
    toInteger(loan?.interestStartRate),
    toInteger(loan?.interestCapRate),
    (toInteger(new Date().getTime()) - toInteger(loan.timestamp)) / 1000
  );

  const onPayback = () => {
    setTxDescription(`Repaying ${repayAmount.toFixed(4)} ETH...`);
    setTxConfirmationModalVisible(true);

    submitTransaction(
      Pikachu.repay(loan.poolIndex, {
        value: ethers.utils.parseEther(repayAmount.toString()),
      }),
      refreshPools
    );
  };

  const onLiquidate = () => {
    setTxDescription(
      `Claiming ${collection?.symbol} #${toInteger(loan.tokenId)}...`
    );
    setTxConfirmationModalVisible(true);

    submitTransaction(
      Pikachu.liquidate(loan.poolIndex, loan.borrower),
      refreshPools
    );
  };

  const loanStatus = useMemo(() => {
    const dueDate = toInteger(loan.timestamp) + toInteger(loan.duration) * 1000;
    const paybackButton = (
      <Button variant="yellow" onClick={onPayback} sx="h-10 w-36">
        Pay Back
      </Button>
    );
    const claimNFTButton = (
      <Button variant="yellow" onClick={onLiquidate} sx="h-10 w-36">
        Claim NFT
      </Button>
    );
    switch (loan.status) {
      case 1:
        if (new Date(dueDate + SECONDS_PER_DAY * 1000) <= new Date()) {
          return {
            text: "Liquidation",
            class: cn(style.error, style.badge),
            operation: myPool ? claimNFTButton : myLoan && paybackButton,
          };
        } else if (new Date(dueDate) <= new Date()) {
          return {
            text: "Grace Period",
            class: cn(style.error, style.badge),
            timer: true,
            operation: myLoan ? paybackButton : "",
            due: new Date(dueDate + SECONDS_PER_DAY * 1000),
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
          operation: `Closed ${dateDifFromNow(loan.repaidAt)}`,
        };
      case 3:
        return {
          text: "Liquidated",
          class: cn(style.error, style.badge),
          operation: `Closed ${dateDifFromNow(loan.repaidAt)}`,
        };
      default:
        return {
          text: "None",
          class: cn(style.error, style.badge),
          operation: "Closed 5 days ago",
        };
    }

    // eslint-disable-next-line
  }, [loan, myLoan, myPool, collection]);

  return (
    <div className={cn(style.root)}>
      <div className={cn(style.collection)}>
        <img
          width={60}
          height={60}
          src={collection?.imageUrl}
          alt="collection"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = ImageERC721;
          }}
        />
        <div>
          <a
            className={cn(style.collectionName)}
            href={`https://opensea.io/assets/ethereum/${loan.collectionContract}/${loan.tokenId}`}
            target="_blank"
            rel="noreferrer"
          >
            {collection?.name}
            <SvgLink />
          </a>
          {collection?.symbol} #{toInteger(loan.tokenId)}
        </div>
      </div>
      <div className={cn(style.borrower)}>
        {beautifyAddress(loan.borrower)} <TextCopier text={loan.borrower} />
      </div>

      <div className={cn(style.interest)}>
        {toFloat(loan.amount)} +{" "}
        {(repayAmount - formatEther(loan.amount)).toFixed(4)}
        <SvgEthereum />
      </div>
      <div>
        {(
          ((repayAmount - formatEther(loan.amount)) /
            formatEther(loan.amount)) *
          100
        ).toFixed(2)}{" "}
        %
      </div>
      <div className={cn(style.dueto, "tooltip-container")}>
        <span className={cn(style.tooltip, "tooltip top")}>
          {new Date(toInteger(loan.timestamp)).toLocaleString()}
        </span>
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
