/* import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Box, Card } from '@mui/material';

const ethers = require('ethers');

interface WalletConnectProps {
  onConnected: (account: string, signer: any) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnected }) => {
  const { connectWallet, connected, id, error } = useWalletConnection(providerType);


  const connectWalletHandler = async () => {
    try {
      if (!connected) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const address = await signer.getAddress();
        const displayAddress = address?.substr(0, 6) + "...";
        const message = "Hey you"
        const sig = await signer.signMessage(message)
        ethers.verifyMessage(message, sig)
        setId(displayAddress)
        setConnected(true)
      } else {
        window.ethereun.selectedAddress = null;
        setConnected(false)
      }
    } catch (error) {
      console.error(error.message);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Card>
      <Box sx={{ padding: '10px' }}>
        <Button variant="contained" color="primary" onClick={connectWalletHandler}>

          {connected ? id : " Connect Wallet"}
        </Button>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Card>
  );
};

export default WalletConnect;
 */
// src/components/WalletConnectButton.tsx
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useWallet } from '@/hooks/useWallet';
import getProvider from './web3ModalSetup';
import { ethers } from 'ethers';

const WalletConnectButton: React.FC = () => {
  const [{ connected, address, error }, connectWallet] = useWallet();
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | undefined>();
  const [provider, setProvider] = useState<ethers.Provider | null>(null);

  useEffect(() => {
    // This function is now safely called client-side
    const loadProvider = async () => {
      try {
        const web3Provider = await getProvider();
        setProvider(web3Provider);
      } catch (error) {
        console.error('Failed to load web3 provider:', error);
      }
    };

    loadProvider();
  }, []);
  return (
    <div>
      {connected ? (
        <p>Connected to {address}</p>
      ) : (
        <Button onClick={connectWallet} variant="contained">
          Connect Wallet
        </Button>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default WalletConnectButton;

