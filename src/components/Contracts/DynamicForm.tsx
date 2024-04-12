
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Button, TextField, Typography, Box, Grid, useTheme } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { executeReadFunction, executeWriteFunction, initContract } from '@/services/contractService';
import setProvider from 'web3modal'
import { Toast } from 'react-toastify/dist/components';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  contractAddress: Yup.string()
    .required('Contract address is required')
    .matches(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address'),
});

const DynamicForm: React.FC = () => {
  const [abi, setAbi] = useState<any[]>([]);
  const [provider] = useState<ethers.BrowserProvider | null>(null);
  /*   const [provider, setProvider] = useState(null);
  
    useEffect(() => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
      } else {
        console.error("Please install MetaMask or another wallet.");
      }
    }, []);*/
  const theme = useTheme();

  useEffect(() => {
    // This checks if the code is running in a browser environment
    if (typeof window !== 'undefined' && window.ethereum) {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      new setProvider(web3Provider);
    } else {
      console.log('Ethereum wallet is not available');
      // Handle cases where the user is not running a browser with Ethereum wallet or if SSR
    }
  }, []);

  useEffect(() => {
    // checks if the code is running in a browser environment
    if (typeof window !== 'undefined' && window.ethereum) {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      new setProvider(web3Provider);
    } else {
      console.log('Ethereum wallet is not available');
      // Handle cases where the user is not running a browser with Ethereum wallet or if its SSR
    }
  }, []);

  const handleAbiFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (event.target.files?.[0]) {
      fileReader.readAsText(event.target.files[0], "UTF-8");
      fileReader.onload = (e) => {
        const content = e.target?.result;
        try {
          setAbi(JSON.parse(content as string));
        } catch (error) {
          console.error("Error parsing ABI:", error);
        }
      };
    }
  }

  // render write and read/query functions
  const renderFunctionForm = (func: any) => {
    const isWriteFunction = ['nonpayable', 'payable'].includes(func.stateMutability);

    return (
      <Box key={func.name} component="form" onSubmit={(e) => handleSubmit(e, func)} noValidate sx={{ mt: 1 }}>
        <Typography variant="h6">{func.name} {isWriteFunction ? '(Write)' : '(Read/Query)'}</Typography>
        <Grid container spacing={2}>
          {func.inputs.map((input: any, inputIndex: number) => (
            <Grid item xs={12} key={inputIndex}>
              <TextField
                required
                id={input.name}
                name={input.name}
                label={`${input.name} (${input.type})`}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
          ))}
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth>
          {isWriteFunction ? 'Execute' : 'Query'}
        </Button>
      </Box>
    );
  };


  // Updated to handle contract interaction
  // Assuming this is part of a React component or similar setup
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, func: { inputs: any[]; stateMutability: string; name: string; }, contractAddress: string | undefined) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const args = func.inputs.map((input: { name: string; }) => formData.get(input.name));

    const contract = initContract(abi, contractAddress, provider);
    try {
      let result;
      if (['nonpayable', 'payable'].includes(func.stateMutability)) {
        result = await executeWriteFunction(contract, func.name, args);
      } else {
        result = await executeReadFunction(contract, func.name, args);
      }
      toast.success(`Function ${func.name} executed successfully! Result: ${result}`);
    } catch (error) {
      console.error(error);
      // Only invoke toast if it's client-side
      if (typeof window !== 'undefined') {
        toast.error(`Error executing ${func.name}: ${error.message || 'Unknown error'}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };


  return (
    <Box sx={{ mt: 4 }}>
      <Formik
        initialValues={{ contractAddress: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Box sx={{ border: `1px solid ${theme.palette.grey['200']}`, padding: '10px' }}>
              <Grid container direction="column">
                <Grid item xs={12}>
                  <Field as={TextField}
                    name="contractAddress"
                    label="Contract Address"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    error={touched.contractAddress && Boolean(errors.contractAddress)}
                    helperText={touched.contractAddress && errors.contractAddress}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                    type="file"
                    accept=".json"
                    fullWidth
                    style={{ display: 'block' }}
                    onChange={handleAbiFileChange}
                  />
                </Grid>
                {/*  <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button size='large' type="submit" variant="contained" fullWidth disabled={isSubmitting}>
                    Load Contract
                  </Button>
                </Grid> */}
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
      <Box sx={{ maxHeight: '400px', overflowY: 'auto', mt: 2 }}>
        {abi.filter(item => item.type === 'function').map(renderFunctionForm)}
      </Box>
    </Box>
  );
}


export default DynamicForm;
