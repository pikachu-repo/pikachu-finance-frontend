import style from "./OpenLoans.module.css";
import cn from "classnames";
import { refreshPools } from "utils/apis/pikachu.api";
import { Refresh } from "components/ui";
import { LoanPanel } from "components/Borrow";
import { useLoansByBorrower } from "utils/hooks/pikachu/usePools";
import { useAccountStore } from "store";

const OpenLoans = () => {
  const { address } = useAccountStore();
  const openLoans = useLoansByBorrower(address).filter(
    (item) => item.status === 1
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

      {openLoans.map((loan, index) => (
        <LoanPanel key={index} loan={loan} />
      ))}

      {openLoans.length === 0 && (
        <div className={cn(style.empty)}>You don’t have open loans.</div>
      )}
    </div>
  );
};

export default OpenLoans;
