import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useWallet } from '@/hooks/useWallet';
import { ethers } from 'ethers';
import { getProvider } from '@/web3modalSetup';
import { Box, Typography, useTheme } from '@mui/material';

const WalletConnectButton: React.FC = () => {
  const [{ connected, address, error }, connectWallet] = useWallet();
  const [provider, setProvider] = useState<ethers.Provider | null>(null);

  const theme = useTheme()
  const handleConnectClick = async () => {
    try {
      const web3Provider = await getProvider();
      setProvider(web3Provider);
      connectWallet();
    } catch (error) {
      console.error('Failed to load web3 provider:', error);
    }
  };
  const shortenAddress = (address: string | null) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <Box sx={{ border: `1px solid ${theme.palette.grey['200']}`, padding: '10px' }}>
      {connected ? (

        <Box>
          Connected to
          <Typography variant='h6'> {shortenAddress(address)}</Typography>
        </Box>
      ) : (
        <Button onClick={handleConnectClick} variant="contained">
          Connect Wallet
        </Button>
      )}
      {error && <Typography>Error: {error}</Typography>}
    </Box>
  );
};

export default WalletConnectButton;
