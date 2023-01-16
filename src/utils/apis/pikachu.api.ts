import axios from "axios";
import { API_URL } from "utils/constants/api.constants";

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
