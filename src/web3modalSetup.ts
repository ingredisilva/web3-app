// Assuming this file is web3ModalSetup.ts
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers } from 'ethers'

// to avoid re-creation
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // The WalletConnectProvider from the '@walletconnect/web3-provider' package
    options: {
      infuraId: 'YOUR_INFURA_ID' 
    }
  }
  // Additional providers when necessary
}

// Function to get a new Web3Modal instance; -> ensures SSR compatibility
const getWeb3Modal = () => {
  return new Web3Modal({
    network: 'mainnet', 
    cacheProvider: true,
    providerOptions
  })
}

// Function to get the provider
export const getProvider = async () => {
  const web3Modal = getWeb3Modal()
  const modalProvider = await web3Modal.connect()
  const provider = new ethers.BrowserProvider(modalProvider)
  return provider
}
