import { ethers } from 'ethers'

export const initContract = async (abi: any[], address: string, provider: ethers.BrowserProvider) => {
  if (!provider) {
    console.error('Provider is not initialized. Make sure your wallet is connected.')
    return
  }
  const signer = provider.getSigner() // getSigner does not need to be awaited
  const contract = new ethers.Contract(address, abi, await signer)
  console.log(contract)
  return contract
}

// read/query function
export const executeReadFunction = async (contract: ethers.Contract, functionName: string, args: any[]) => {
  try {
    const result = await contract[functionName](...args)
    console.log(`${functionName} query result:`, result.toString())
    return result
  } catch (error) {
    console.error(`Error with ${functionName}:`, error)
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
   }
}
