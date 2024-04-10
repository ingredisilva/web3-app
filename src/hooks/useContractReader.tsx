import { useCallback, useState } from 'react';
import { ethers } from 'ethers';

// This hook is for read-only contract methods
export const useContractReader = (contract) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callContractMethod = useCallback(async (methodName, args) => {
    setLoading(true);
    try {
      const result = await contract[methodName](...args);
      setData(result);
      setError(null);
    } catch (e) {
      console.error(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [contract]);

  return { data, loading, error, callContractMethod };
};
