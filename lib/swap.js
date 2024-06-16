import * as chainRegistry from "chain-registry"; // Importing the "chain-registry" module
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing"; // Importing the "DirectSecp256k1HdWallet" class from the "@cosmjs/proto-signing" module
import { stringToPath } from "@cosmjs/crypto"; // Importing the "stringToPath" function from the "@cosmjs/crypto" module
import { SkipRouter } from "@skip-router/core"; // Importing the "SkipRouter" class from the "@skip-router/core" module

// Generates a Cosmos signer for a given chainID,
// loading the mnemonic from the environment
async function getCosmosSigner(chainID) {
  // load mnemonic from environment
  const mnemonic = process.env.MNEMONIC; // Retrieving the mnemonic from the environment
  if (!mnemonic) {
    throw new Error("Mnemonic not set"); // Throwing an error if the mnemonic is not set
  }
  // find chain in chain registry to get bech32 prefix and cointype
  const chain = chainRegistry.chains.find(chain => chain.chain_id === chainID); // Finding the chain in the chain registry based on the chainID
  if (!chain) {
    throw new Error(`Chain with chainID ${chainID} not found`); // Throwing an error if the chain is not found in the registry
  }
  if (!chain.bech32_prefix) {
    throw new Error(`Chain Registry missing prefix for ${chainID}`); // Throwing an error if the chain registry is missing the bech32 prefix for the chainID
  }
  if (!chain.slip44) {
    throw new Error(`Chain Registry missing cointype for ${chainID}`); // Throwing an error if the chain registry is missing the cointype for the chainID
  }
  // create wallet
  const hdPath = stringToPath(`m/44'/${chain.slip44}'/0'/0/0`); // Creating the HD path for the wallet based on the chain's slip44 value
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: chain.bech32_prefix, // Setting the bech32 prefix for the wallet
    hdPath: hdPath, // Setting the HD path for the wallet
  });
  return wallet; // Returning the created wallet
}

async function getCosmosAddress(chainID) {
  const signer = await getCosmosSigner(chainID); // Getting the Cosmos signer for the given chainID
  const accounts = await signer.getAccounts(); // Getting the accounts associated with the signer
  if (!Array.isArray(accounts) || accounts.length === 0) {
    throw new Error('No accounts available'); // Throwing an error if no accounts are available
  }
  return accounts[0].address; // Returning the address of the first account
}

(async () => {
  const skipClient = new SkipRouter({
    getCosmosSigner, // Setting the "getCosmosSigner" function as a property of the SkipRouter instance
  });

  const route = await skipClient.route({
    sourceAssetDenom: "uusdc", // Setting the source asset denomination
    sourceAssetChainID: "noble-1", // Setting the source asset chainID
    destAssetDenom: "utia", // Setting the destination asset denomination
    destAssetChainID: "celestia", // Setting the destination asset chainID
    amountIn: "1000000", // 1 uusdc
    smartSwapOptions: {
      splitRoutes: true, // Setting the splitRoutes option to true
    },
  });
  console.log(route); // Logging the route object

  // get user addresses for each requiredChainAddress
  const userAddresses = await Promise.all(route.requiredChainAddresses.map(async (chainID) => {
    return {
      chainID: chainID,
      address: await getCosmosAddress(chainID), // Getting the Cosmos address for each requiredChainAddress
    };
  }));
  console.log(userAddresses); // Logging the user addresses

  /* EXECUTE ROUTE
  await skipClient.executeRoute({
    route,
    userAddresses,
    onTransactionCompleted: (chainID, txHash, status) => {
      console.log(`Route completed with tx hash: ${txHash} & status: ${status.state}`);
    },
  });
  */
})();
