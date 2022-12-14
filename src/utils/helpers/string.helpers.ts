import { BigNumberish } from "ethers";

export const beautifyAddress = (address: string, count: number = 4) => {
  return `${address.slice(0, count)}...${address.slice(-count)}`;
};

export const toString = (value: string | undefined) => {
  return value || "";
};
export const toInteger = (value: string | undefined | BigNumberish) => {
  return parseInt(value?.toString() || "0");
};
export const toFloat = (value: string | undefined) => {
  return parseFloat(value || "0");
};
