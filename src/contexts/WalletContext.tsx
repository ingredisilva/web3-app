import { useState, useCallback, useContext, createContext } from 'react';
import { ethers } from 'ethers';
import { disconnect, getProvider, getWeb3Modal } from '@/web3modalSetup';
import { IProvider } from 'custom';

interface WalletContextType {
  state: WalletState;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | null>(null);

interface WalletState {
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  address: string | null;
  connected: boolean;
  error: string | null;
}

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

export const WalletProvider = ({ children }: IProvider) => {
  const [state, setState] = useState<WalletState>({
    provider: null,
    signer: null,
    address: null,
    connected: false,
    error: null,
  });

  const connectWallet = useCallback(async () => {
    let web3ModalInstance = null;

    try {
      web3ModalInstance = getWeb3Modal();
      const provider = await getProvider();
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
      setState(s => ({ ...s, error: error instanceof Error ? error.message : String(error) }));
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    disconnect();
    setState({
      provider: null,
      signer: null,
      address: null,
      connected: false,
      error: null,
    });
  }, []);

  /*   useEffect(() => {
      if (web3Modal?.cachedProvider) {
        connectWallet();
      }
    }, [connectWallet]); */

  return (
    <WalletContext.Provider value={{ state, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};