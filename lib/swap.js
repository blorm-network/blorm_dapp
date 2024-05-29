const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const { SkipRouter, SKIP_API_URL } = require("@skip-router/core");

const SOURCE_DENOM = "uusdc";
const SOURCE_CHAIN_ID = "137";
const DEST_DENOM = "uusdc";
const DEST_CHAIN_ID = "80001";

const AMOUNT_IN = "1000000";

const USER_ADDRESSES = {
  "cosmoshub-4": "0x0c778e66efa266b5011c552C4A7BDA63Ad24C37B", // <---- UPDATE THIS
  "osmosis-1": "0x0c778e66efa266b5011c552C4A7BDA63Ad24C37B", // <---- UPDATE THIS
};

const MNEMONIC = ""; // <---- UPDATE THIS

async function main() {
  const client = new SkipRouter({
    apiURL: SKIP_API_URL,
    getCosmosSigner: async (chainID) => {
      return DirectSecp256k1HdWallet.fromMnemonic(MNEMONIC);

      // using the keplr browser extension:
      // if (!window.keplr) {
      //   throw new Error("Keplr extension not installed");
      // }

      // return window.keplr.getOfflineSigner(chainID)
    },
  });

  const route = await client.route({
    amountIn: AMOUNT_IN,
    sourceAssetDenom: SOURCE_DENOM,
    sourceAssetChainID: SOURCE_CHAIN_ID,
    destAssetDenom: DEST_DENOM,
    destAssetChainID: DEST_CHAIN_ID,
    cumulativeAffiliateFeeBPS: "0",
  });

  await client.executeRoute({
    route,
    userAddresses: USER_ADDRESSES,
    onTransactionCompleted: async (tx) => {
      console.log(tx);
    },
  });
}

main();
