import { BigNumber, BigNumberish } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { toInteger } from "utils/helpers/string.helpers";
import { IPikachu } from "utils/typechain-types/contracts/Master.sol/Pikachu";
// import { BIG_TEN } from "utils/constants/number.contants";
import { usePikachuContract } from "../useContract";

type TLoanStruct = {
  poolOwner: string;
  borrower: string;
  amount: BigNumberish;
  duration: BigNumberish;
  collection: string;
  tokenId: BigNumberish;
  status: number;
  blockNumber: BigNumberish;
  timestamp: BigNumberish;
  interestType: number;
  interestStartRate: BigNumberish;
  interestCapRate: BigNumberish;
};

export const useOwner = () => {
  const Pikachu = usePikachuContract();
  const [owner, setOwner] = useState("");

  const getOwner = useCallback(async () => {
    if (Pikachu.provider)
      try {
        const _owner = await Pikachu.owner();
        setOwner(_owner);
      } catch (error) {
        setOwner("");
        console.log(error);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Pikachu.provider]);

  useEffect(() => {
    getOwner();
  }, [getOwner]);

  return owner;
};
export const useTotalPools = () => {
  const Pikachu = usePikachuContract();
  const [totalPools, setTotalPools] = useState(0);

  const getTotalPools = useCallback(async () => {
    if (Pikachu.provider)
      try {
        const _totalPools = await Pikachu.totalPools();
        setTotalPools(_totalPools.toNumber());
      } catch (error) {
        setTotalPools(0);
        console.log(error);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Pikachu.provider]);

  useEffect(() => {
    getTotalPools();
  }, [getTotalPools]);

  return totalPools;
};

export const usePools = () => {
  const Pikachu = usePikachuContract();
  const [pools, setPools] = useState<IPikachu.PoolStructOutput[]>([]);

  const getPools = useCallback(async () => {
    if (Pikachu.provider)
      try {
        const totalPools = await Pikachu.totalPools();
        const integerArray = Array.from(
          { length: totalPools.toNumber() },
          (_, i) => i
        );

        const _pools = await Promise.all(
          integerArray.map((index) => Pikachu.getPoolById(index))
        );
        setPools(_pools);
      } catch (error) {
        setPools([]);
        console.log(error);
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Pikachu.provider]);

  useEffect(() => {
    getPools();
  }, [getPools]);

  return pools;
};

export const useLoan = (poolOwner: string, borrower: string) => {
  const Pikachu = usePikachuContract();
  const [loan, setLoan] = useState<TLoanStruct>({
    poolOwner: "",
    amount: 0,
    blockNumber: 0,
    borrower: "",
    collection: "",
    duration: 0,
    interestCapRate: 0,
    interestStartRate: 0,
    interestType: 0,
    status: 0,
    timestamp: 0,
    tokenId: 0,
  });

  const getLoan = useCallback(async () => {
    if (Pikachu.provider)
      try {
        const _loan = await Pikachu.loans(poolOwner, borrower);
        setLoan({ ..._loan, poolOwner: poolOwner });
      } catch (error) {
        // setLoan([]);
        console.log(error);
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Pikachu.provider, poolOwner, borrower]);

  useEffect(() => {
    getLoan();
  }, [getLoan]);

  return loan;
};

export const useRepayingAmount = (loan: TLoanStruct) => {
  const Pikachu = usePikachuContract();
  const [repayingAmount, setRepayingAmount] = useState<BigNumberish>(
    BigNumber.from("0")
  );

  const getRepayingAmount = useCallback(async () => {
    if (Pikachu.provider)
      try {
        if (loan.status === 0) {
          setRepayingAmount(0);
          return;
        }
        const _repayingAmount = await Pikachu.calculateRepayAmount(
          toInteger(new Date().getTime() / 1000) - toInteger(loan.timestamp),
          loan.interestType,
          loan.interestStartRate,
          loan.interestCapRate,
          loan.amount
        );
        setRepayingAmount(_repayingAmount);
      } catch (error) {
        setRepayingAmount(0);
        console.log(error);
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Pikachu.provider, loan]);

  useEffect(() => {
    getRepayingAmount();
  }, [getRepayingAmount]);

  return repayingAmount;
};
