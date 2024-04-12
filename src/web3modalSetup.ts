// @ts-nocheck
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

let web3Modal: Web3Modal | null = null

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: 'YOUR_INFURA_ID' // Replace with your actual Infura ID
    }
  }
  // Add other providers as needed
}

// get a new Web3Modal instance; -> ensures SSR compatibility
export const getWeb3Modal = (): Web3Modal => {
  if (typeof window !== 'undefined' && !web3Modal) {
    web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
      providerOptions
    })
  }
  if (!web3Modal) {
    throw new Error('Web3Modal is not initialized')
  }
  return web3Modal
}

// Function to get the provider
export const getProvider = async (): Promise<ethers.BrowserProvider> => {
  const web3ModalInstance = getWeb3Modal()
  const externalProvider = await web3ModalInstance.connect()
  return new ethers.BrowserProvider(externalProvider)
}
export const disconnect = async () => {
  const web3ModalInstance = getWeb3Modal()
  web3ModalInstance.clearCachedProvider()

  // If there's an established WalletConnect session, we need to explicitly disconnect it
  if (web3ModalInstance.cachedProvider === 'walletconnect' && web3ModalInstance?.currentProvider?.disconnect) {
    await web3ModalInstance.currentProvider.disconnect()
  }
  web3Modal = null
}