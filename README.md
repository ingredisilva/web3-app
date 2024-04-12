# Project Documentation

NPM INSTALL
NPM RUN DEV

## Technologies

- **Framework:** Next.js
- **Programming Language:** TypeScript
- **State Management:** Redux

## Libraries

- **Ethers.js:** Ethereum wallet integration and blockchain interaction.
- **Web3Modal:** A library to handle connections with various Ethereum providers.

## DynamicForm Component

The `DynamicForm` component is designed for blockchain-based applications, facilitating user interactions with smart contracts. This component allows users to:

- **Connect to a Wallet:** Users can connect their Ethereum wallet to interact with the blockchain.
- **Load Smart Contract ABI:** Users can upload a JSON file containing the ABI (Application Binary Interface) of a smart contract. The ABI is necessary for the Ethereum Virtual Machine (EVM) to understand how to interact with the smart contract.
- **Enter Contract Address:** Users must provide the address of the smart contract they wish to interact with. The form validates that the entered address follows the Ethereum address format.
- **Interact with Smart Contract Functions:** Based on the loaded ABI, the form dynamically generates input fields for different smart contract functions. Users can execute both read (query) and write (transaction) functions directly from the form.
- **Validation and Feedback:** The form includes validation for the contract address and provides feedback on the status of interactions, such as success messages or errors during contract execution.

## WalletContext and useWallet Hook

The `WalletContext` provides a centralized way to manage and access the state of a user's wallet connection across the application. It is built using React's Context API to ensure components throughout the application can access wallet state and operations without prop drilling.

### Key Components

- **WalletState:** Manages the state of the wallet including the Ethereum provider, signer, connected status, address, and any connection errors.
- **useWallet:** A custom hook that provides easy access to the `WalletContext`. It ensures that the context is used within a component wrapped by `WalletProvider` and throws an error if not.
- **connectWallet:** Asynchronously connects to an Ethereum wallet using Web3Modal, setting up the provider and signer for interacting with the blockchain.
- **disconnectWallet:** Disconnects the current wallet session and clears any related state, ensuring privacy and security by cleaning up after a user decides to disconnect their wallet.

## web3modalSetup

The `web3modalSetup` file configures and initializes Web3Modal, a library that provides a universal modal to connect with various Ethereum providers.

### Key Functions

- **getWeb3Modal:** Initializes and returns an instance of Web3Modal configured with specified options such as the network and provider options (like WalletConnect with an Infura ID).
- **getProvider:** Uses the Web3Modal instance to connect to an Ethereum provider, which can be used throughout the application to interact with the blockchain.
- **disconnect:** Clears the cached provider from Web3Modal, effectively logging the user out and requiring them to reconnect their wallet for future transactions.

## Smart Contract Interaction Functions

These utility functions facilitate interacting with smart contracts on the blockchain, leveraging the Ethereum provider obtained from Web3Modal.

- **initContract:** Initializes a new ethers.js Contract instance using a provided ABI, contract address, and signer from the Ethereum provider. This function is essential for both reading from and writing to the smart contract.
- **executeReadFunction:** Executes a read-only call to a smart contract function, using the contract instance. It does not require a gas fee as it does not alter the blockchain state.
- **executeWriteFunction:** Executes a transactional function call that alters the blockchain state. This function sends a transaction to the network, waits for it to be mined, and returns the transaction receipt.
