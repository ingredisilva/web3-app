import { ethers } from 'ethers'

// Initialize a contract with ABI and address
export const initContract = async (abi: any[], address: string, provider: ethers.providers.Web3Provider) => {
  if (!provider) {
    throw new Error('Provider is not initialized. Make sure your wallet is connected.')
  }
  const signer = await provider.getSigner()
  return new ethers.Contract(address, abi, signer)
}

// read/query function
export const executeReadFunction = async (contract: ethers.Contract, functionName: string, args: any[]) => {
  try {
    const result = await contract[functionName](...args)
    console.log(`${functionName} query result:`, result.toString())
    return result
  } catch (error) {
    console.error(`Error with ${functionName}:`, error)
    throw error
  }
}

// write function
export const executeWriteFunction = async (contract: ethers.Contract, functionName: string, args: any[]) => {
  try {
    const transactionResponse = await contract[functionName](...args)
    const receipt = await transactionResponse.wait()
    console.log(`${functionName} transaction successful!`, receipt)
    return receipt
  } catch (error) {
    console.error(`Error with ${functionName}:`, error)
    throw error 
  }
}
