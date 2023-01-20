import style from "./ClosedLoans.module.css";
import cn from "classnames";
import { refreshPools } from "utils/apis/pikachu.api";
import { Refresh } from "components/ui";
import { LoanPanel } from "components/Borrow";
import { useAccountStore } from "store";

const ClosedLoans = () => {
  const { loans } = useAccountStore();
  const closedLoans = loans.filter(
    (item) => item.status === 2 || item.status === 3
  );

  return (
    <div className={cn(style.root)}>
      <div className={cn(style.head)}>
        <span>NFT</span>
        <span>Borrower</span>
        <span>Amount + Interest</span>
        <span>Interest</span>
        <span>Fund Date</span>
        <span>Status</span>
        <span>
          <Refresh action={refreshPools} />
        </span>
      </div>

      {closedLoans.map((loan, index) => (
        <LoanPanel key={index} loan={loan} />
      ))}

      {closedLoans.length === 0 && (
        <div className={cn(style.empty)}>You don’t have open loans.</div>
      )}
    </div>
  );
};

export default ClosedLoans;
