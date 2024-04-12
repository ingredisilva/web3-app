// @ts-nocheck
import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Grid } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { initContract, executeReadFunction, executeWriteFunction } from '@/services/contractService';
import { toast } from 'react-toastify';
import { ethers } from 'ethers'
import { useWallet } from '@/contexts/WalletContext';
import { useTheme } from '@emotion/react';
import SparqLogo from 'public/images/backgrounds/logo.webp'
const validationSchema = Yup.object().shape({
  contractAddress: Yup.string()
    .required('Contract address is required')
    .matches(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address'),
});

const DynamicForm = () => {
  const { provider, signer, connected } = useWallet();  // provider and signer from context
  const [abi, setAbi] = useState<any[]>([]);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  const theme = useTheme();

  const handleAbiFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (event.target.files?.[0]) {
      fileReader.readAsText(event.target.files[0], "UTF-8");
      fileReader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          try {
            const parsedAbi = JSON.parse(result);
            setAbi(parsedAbi);
          } catch (error) {
            console.error("Error parsing ABI:", error);
            toast.error("Error parsing ABI: " + error.message);
          }
        } else {
          toast.error("The file content is not a valid JSON.");
        }
      };
      fileReader.onerror = (error) => {
        console.error("FileReader error:", error);
        toast.error("Failed to read file: " + error.message);
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, func: { inputs: any[]; stateMutability: string; name: string; }, contractAddress: string) => {
    e.preventDefault();

    if (!provider || !signer) {
      toast.error("Please connect your wallet first.");
      return;
    }
    if (!abi || !contractAddress) {
      toast.error("ABI or Contract Address is missing.");
      return;
    }
    const contract = await initContract(abi, contractAddress, provider);

    if (!contract) {
      toast.error("Contract is not initialized. Please load the contract first.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const args = func.inputs.map(input => formData.get(input.name));

    try {
      let result;
      if (['nonpayable', 'payable'].includes(func.stateMutability)) {
        result = await executeWriteFunction(contract, func.name, args);
      } else {
        result = await executeReadFunction(contract, func.name, args);
      }
      toast.success(`Function ${func.name} executed successfully! Result: ${result}`);
    } catch (error) {
      console.error(`Error executing function ${func.name}:`, error);
      toast.error(`Error executing function ${func.name}: ${error.message}`);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%' }}>
        <img
          src={'/images/backgrounds/logo.webp'}
          alt='Logo'
          style={{
            width: '20%',
            objectFit: 'cover'
          }} />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Formik
          initialValues={{ contractAddress: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setContract(initContract(abi, values.contractAddress, provider));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors, touched, setFieldValue, values }) => (
            <Form>
              <Box sx={{ border: `1px solid ${theme.palette.grey['200']}`, padding: '10px' }}>
                <Field as={TextField}
                  name="contractAddress"
                  label="Contract Address"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  error={touched.contractAddress && Boolean(errors.contractAddress)}
                  helperText={touched.contractAddress && errors.contractAddress} />
                <Box sx={{ mt: 2, display: 'flex' }}>
                  <Box>
                    <TextField
                      type="file"
                      accept=".json"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{ display: 'block' }}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        handleAbiFileChange(event);
                        setFieldValue('abiFile', event.currentTarget.files[0]);
                      }}
                      disabled={!values.contractAddress}
                    />
                  </Box>
                  <Box sx={{ marginLeft: '8px' }}>
                    <Button type="submit" disabled={isSubmitting} variant="contained" fullWidth>
                      Load Contract
                    </Button>
                  </Box>

                </Box>
              </Box>
            </Form>
          )}
        </Formik>

        {abi.length > 0 && contract && (
          <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
            {abi.filter(item => item.type === 'function').map(func => (
              <form onSubmit={(e) => handleSubmit(e, func, contract.address)} key={func.name}>
                {func.inputs.map((input: { name: any; type: any; }, index: React.Key | null | undefined) => (
                  <TextField
                    key={index}
                    required
                    label={`${input.name} (${input.type})`}
                    fullWidth
                    margin="normal"
                    variant="outlined" />
                ))}
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth>
                  {func.stateMutability === 'view' ? 'Query' : 'Execute'}
                </Button>
              </form>
            ))}
          </Box>
        )}
      </Box></>
  );
};

export default DynamicForm;
