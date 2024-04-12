import { ethers } from "ethers"

export type ProviderType = 'MetaMask' | 'WalletConnect' | 'CoinbaseWallet'
export interface WalletProvider {
  isMetaMask?: boolean
}

export interface WalletConnectButtonProps {
  providerType: ProviderType
}

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

