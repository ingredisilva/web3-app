import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';

const ContractInteraction = ({ contract }) => {
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [balanceOfAccount, setBalanceOfAccount] = useState('');

  const handleTransfer = async () => {
    console.log('Transfer:', transferTo, transferAmount);
  };

  const handleQueryBalance = async () => {
    console.log('Query balance for:', balanceOfAccount);
  };

  return (
    <Box>
      <Typography variant="h6">Transfer</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={true}>
          <TextField
            label="to"
            value={transferTo}
            onChange={(e) => setTransferTo(e.target.value)}
            margin="normal"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={true}>
          <TextField
            label="transfer"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            margin="normal"
            fullWidth
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={'auto'}>
          <Button variant="contained" onClick={handleTransfer} fullWidth>
            Write
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h6" mt={4}>
        balanceOf
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={true}>
          <TextField
            label="account"
            value={balanceOfAccount}
            onChange={(e) => setBalanceOfAccount(e.target.value)}
            margin="normal"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={'auto'}>
          <Button variant="contained" color="primary" onClick={handleQueryBalance} fullWidth>
            Query
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContractInteraction;
