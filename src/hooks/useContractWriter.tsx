import { useCallback, useState } from 'react';
import { ethers } from 'ethers';

// This hook is for write contract methods that require a transaction
export const useContractWriter = (contract: unknown, signer: unknown) => {
  const [tx, setTx] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendTransaction = useCallback(async (methodName: string | number, args: any) => {
    setLoading(true);
    try {
      const unsignedTx = await contract.populateTransaction[methodName](...args);
      const signedTx = await signer.sendTransaction(unsignedTx);
      setTx(signedTx);
      setError(null);
    } catch (e) {
      console.error(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [contract, signer]);

  return { tx, loading, error, sendTransaction };
};
