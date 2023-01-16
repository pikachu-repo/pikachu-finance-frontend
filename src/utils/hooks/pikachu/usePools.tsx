import { BigNumber, BigNumberish } from "ethers";
import { useCallback, useEffect, useState, useMemo } from "react";
import { toInteger } from "utils/helpers/string.helpers";
import { IPikachu } from "utils/typechain-types/contracts/Master.sol/Pikachu";
// import { BIG_TEN } from "utils/constants/number.contants";
import axios from "axios";
import { usePikachuContract } from "../useContract";
import { API_URL } from "utils/constants/api.constants";
import { SECONDS_PER_DAY } from "utils/constants/number.contants";

export type TLoanStruct = {
  poolIndex: number;
  borrower: string;
  amount: BigNumberish;
  duration: BigNumberish;
  collection?: string;
  collectionContract?: string;
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
export const usePoolByOwner = (owner: string) => {
  const Pikachu = usePikachuContract();
  const [pools, setPools] = useState<IPikachu.PoolStructOutput[]>([]);

  const getPools = useCallback(async () => {
    if (Pikachu.provider)
      try {
        const _pools = await Pikachu.getPoolsByOwner(owner);
        setPools(_pools);
      } catch (error) {
        setPools([]);
        console.log(error);
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Pikachu.provider]);

  useEffect(() => {
    getPools();
  }, [getPools, owner]);

  return pools;
};

export const useLoan = (poolIndex: number, borrower: string) => {
  const Pikachu = usePikachuContract();
  const [loan, setLoan] = useState<TLoanStruct>({
    poolIndex: 0,
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
        const _loan = await Pikachu.loans(poolIndex, borrower);
        setLoan({ ..._loan, poolIndex: poolIndex });
      } catch (error) {
        // setLoan([]);
        console.log(error);
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Pikachu.provider, poolIndex, borrower]);

  useEffect(() => {
    getLoan();
  }, [getLoan]);

  return loan;
};
export const useLoans = (poolIndex: number) => {
  const [loans, setLoans] = useState<TLoanStruct[]>([]);

  const getLoans = useCallback(async () => {
    try {
      const _response = await axios.get(`${API_URL}/pools/${poolIndex}/loans`);
      setLoans(_response.data);
    } catch (error) {
      // setLoans([]);
      console.log(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolIndex]);

  useEffect(() => {
    getLoans();
  }, [getLoans]);

  return loans;
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

export const usePoolById = (poolId: number): IPikachu.PoolStructOutput => {
  const Pikachu = usePikachuContract();
  const [pool, setPool] = useState<IPikachu.PoolStructOutput>();

  const getPool = useCallback(async () => {
    if (Pikachu.provider)
      try {
        const _pool = await Pikachu.getPoolById(poolId);
        setPool(_pool);
      } catch (error) {
        console.log(error);
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Pikachu.provider]);

  useEffect(() => {
    getPool();
  }, [getPool]);

  //@ts-ignore
  return pool;
};

export const useCalculateRepayAmount = (
  _amount: number,
  _interestType: number,
  _interestStartRate: number, // basis point
  _interestCapRate: number, // basis point
  _durationSecond: number // second
) => {
  return useMemo(() => {
    const durationInDays = toInteger(_durationSecond) / SECONDS_PER_DAY;

    if (_interestType === 0) {
      return (
        _amount +
        (_amount * (_interestStartRate + durationInDays * _interestCapRate)) /
          10000
      );
    } else {
      return (
        _amount +
        (_amount * _interestStartRate) / 10000 +
        (_amount * Math.sqrt(durationInDays * 10000) * _interestCapRate) /
          1000000
      );
    }
  }, [
    _amount,
    _interestType,
    _interestStartRate,
    _interestCapRate,
    _durationSecond,
  ]);
};
