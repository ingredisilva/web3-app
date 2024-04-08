import React, { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ContractMethods from './ContractMethods';

const ethers = require('ethers');

interface ContractLoaderProps {
  onContractLoaded: (contractAddress: string, abi: any) => void;
}

const ContractLoader: React.FC<ContractLoaderProps> = ({ onContractLoaded }) => {
  const [contractAddress, setContractAddress] = useState<string>('');
  const [abi, setAbi] = useState<any>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => setContractAddress(e.target.value);

  const handleAbiFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const jsonAbi = JSON.parse(e.target?.result as string);
        setAbi(jsonAbi);
      } catch (err) {
        setSnackbarMessage('Invalid ABI file');
        setOpenSnackbar(true);
      }
    };
    fileReader.readAsText(file);
  };

  const loadContract = () => {
    if (abi && ethers?.utils?.isAddress(contractAddress)) {
      onContractLoaded(contractAddress, abi);
    } else {
      setSnackbarMessage('Invalid contract address or ABI');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <TextField
        type="file"
        onChange={handleAbiFileChange}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Contract Address"
        variant="outlined"
        value={contractAddress}
        onChange={handleAddressChange}
        margin="normal"
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={loadContract} fullWidth>
        Load Contract
      </Button>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <ContractMethods contract={undefined} />
    </div>
  );
};

export default ContractLoader;
