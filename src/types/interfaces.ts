import { ethers } from "ethers"

// Define supported provider types
export type ProviderType = 'MetaMask' | 'WalletConnect' | 'CoinbaseWallet'

// Interface for the wallet provider object (if needed)
export interface WalletProvider {
  isMetaMask?: boolean
  // Any other properties specific to different wallet providers
}

// Interface for the props of WalletConnectButton component
export interface WalletConnectButtonProps {
  providerType: ProviderType
}

// Interface for the return value of useWalletConnection hook
export interface WalletConnectionHook {
  connectWallet: () => void
  connected: boolean
  id: string | null
  error: string
}

export interface WalletContextState {
  provider?: WalletProvider
  signer?: ethers.Signer
  address?: string
}

