declare module '*.png' {
  const value: any
  export = value
}
export interface Window {
  ethereum?: {
    [x: string]: { request: ({ method }: { method: string }) => Promise<void> } | undefined
    request: ({ method }: { method: string }) => Promise<void>
  }
}

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider
  }
}

import type {
  ExternalProvider,
  JsonRpcFetchFunc,
} from "@ethersproject/providers";
import { Web3Provider } from "@ethersproject/providers";

export default function getLibrary(
  provider: ExternalProvider | JsonRpcFetchFunc
) {
  return new Web3Provider(provider);
}
