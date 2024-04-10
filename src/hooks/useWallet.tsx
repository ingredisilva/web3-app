import { useState, useCallback } from 'react';
import { ethers } from 'ethers';

// Hook for connecting to a wallet
export const useWalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnected, setConnected] = useState(false);
  const [error, setError] = useState('');

  const connectWalletHandler = useCallback(async (walletProvider: ethers.Eip1193Provider) => {
    try {
      if (!isConnected) {
        const provider = new ethers.BrowserProvider(walletProvider);
        const signer = provider.getSigner();
        const address = await (await signer).getAddress();
        const displayAddress = `${address.substring(0, 6)}...`;

        // Optional: Sign a message for further verification
        const message = 'Hey there, please sign this message to connect.';
        const signature = await (await signer).signMessage(message);
        ethers.utils.verifyMessage(message, signature);

        setWalletAddress(displayAddress);
        setConnected(true);
      } else {
        // To handle disconnecting
        setWalletAddress(null);
        setConnected(false);
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  }, [isConnected]);

  return { walletAddress, isConnected, error, connectWalletHandler };
};

