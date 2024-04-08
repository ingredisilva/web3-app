import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Box, Card } from '@mui/material';

const ethers = require('ethers');

interface WalletConnectProps {
  onConnected: (account: string, signer: any) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnected }) => {
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const connectWalletHandler = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        onConnected(accounts[0], signer);
      } catch (err: any) {
        setError(err.message);
        setOpenSnackbar(true);
      }
    } else {
      setError('Please install MetaMask.');
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
          Connect Wallet
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
