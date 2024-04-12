//@ts
import React, { useState } from 'react';
import Button from '@mui/material/Button';

import { Box, Typography, useTheme } from '@mui/material';
import { useWallet } from '@/contexts/WalletContext';

const WalletConnectButton: React.FC = () => {
  const { state, connectWallet, disconnectWallet } = useWallet();
  const { connected, address, error } = state;

  const theme = useTheme()

  const shortenAddress = (address: string | null) => {
    if (!address) {
      return "Endereço Indisponível";
    }

    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <Box sx={{ border: `1px solid ${theme.palette.grey['200']}`, padding: '10px' }}>
      {connected ? (
        <Box>
          Connected to
          <Typography variant='h6'> {shortenAddress(address)}</Typography>
          <Button onClick={disconnectWallet} variant="contained" color="secondary">
            Disconnect
          </Button>
        </Box>
      ) : (
        <Button onClick={connectWallet} variant="contained">
          Connect Wallet
        </Button>
      )}
      {/*       {error && <Typography>Error: {error}</Typography>}
 */}    </Box>
  );
};

export default WalletConnectButton;
