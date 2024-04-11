import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { getProvider } from '@/web3modalSetup';

interface WalletState {
  provider: ethers.Provider | null;
  signer: ethers.Signer | null;
  address: string | null;
  connected: boolean;
  error: string | null;
}

export const useWallet = (): [WalletState, () => void] => {
  const [state, setState] = useState<WalletState>({
    provider: null,
    signer: null,
    address: null,
    connected: false,
    error: null,
  });

  const connectWallet = useCallback(async () => {
    try {
      const provider = await getProvider(); // This is from our Web3Modal setup
      const signer = provider.getSigner();
      const address = await (await signer).getAddress();

      setState({
        provider,
        signer,
        address,
        connected: true,
        error: null,
      });
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      setState(s => ({ ...s, error: error instanceof Error ? error.message : String(error) }));
    }
  }, []);

  // Automatically reconnect if the user has previously selected a provider
  useEffect(() => {
    if (window.localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")) {
      connectWallet();
    }
  }, [connectWallet]);

  return [state, connectWallet];
};
