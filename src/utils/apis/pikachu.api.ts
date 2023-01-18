import axios from "axios";
import { API_URL } from "utils/constants/api.constants";
import { TLoanStruct } from "utils/hooks/pikachu/usePools";

export const getSignature = async (
  collection: string
): Promise<{
  floorPrice: number;
  signature: string;
  blockNumber: number;
}> => {
  const _response = await axios.get(`${API_URL}/pools/signature/${collection}`);

  return _response.data;
};

export const refreshPools = async () => {
  await axios.get(`${API_URL}/pools/update`);
};

export const getLoansByPoolId = async (
  poolId: number
): Promise<TLoanStruct[]> => {
  const _response = await axios.get(`${API_URL}/loans/pool/${poolId}`);
  return _response.data;
};

export const getLoansByBorrower = async (
  borrower: string
): Promise<TLoanStruct[]> => {
  const _response = await axios.get(`${API_URL}/loans/borrower/${borrower}`);
  return _response.data;
};
