import { SECONDS_PER_DAY } from "utils/constants/number.contants";
import { toInteger } from "./string.helpers";

export const calculateRepayAmount = (
  _amount: number,
  _interestType: number,
  _interestStartRate: number, // basis point
  _interestCapRate: number, // basis point
  _durationSecond: number // second
) => {
  const durationInDays = toInteger(_durationSecond / SECONDS_PER_DAY);

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
      (_amount * Math.sqrt(durationInDays * 10000) * _interestCapRate) / 1000000
    );
  }
};

// console.log(calculateRepayAmount(1, 0, 0, 876, 7));
