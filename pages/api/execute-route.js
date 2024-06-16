// pages/api/execute-route.js

import { SkipRouter } from "@skip-router/core";
import * as chainRegistry from "chain-registry";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { stringToPath } from "@cosmjs/crypto";

async function getCosmosSigner(chainID) {
  const mnemonic = process.env.MNEMONIC;
  if (!mnemonic) {
    throw new Error("Mnemonic not set");
  }
  const chain = chainRegistry.chains.find(chain => chain.chain_id === chainID);
  if (!chain) {
    throw new Error(`Chain with chainID ${chainID} not found`);
  }
  if (!chain.bech32_prefix) {
    throw new Error(`Chain Registry missing prefix for ${chainID}`);
  }
  if (!chain.slip44) {
    throw new Error(`Chain Registry missing cointype for ${chainID}`);
  }
  const hdPath = stringToPath(`m/44'/${chain.slip44}'/0'/0/0`);
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: chain.bech32_prefix,
    hdPath: hdPath,
  });
  return wallet;
}

async function getCosmosAddress(chainID) {
  const signer = await getCosmosSigner(chainID);
  const accounts = await signer.getAccounts();
  if (!Array.isArray(accounts) || accounts.length === 0) {
    throw new Error('No accounts available');
  }
  return accounts[0].address;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { route } = req.body;

    const skipClient = new SkipRouter({ getCosmosSigner });

    try {
      const userAddresses = await Promise.all(route.requiredChainAddresses.map(async (chainID) => {
        return {
          chainID: chainID,
          address: await getCosmosAddress(chainID),
        };
      }));

      await skipClient.executeRoute({
        route,
        userAddresses,
        onTransactionCompleted: (chainID, txHash, status) => {
          console.log(`Route completed with tx hash: ${txHash} & status: ${status.state}`);
        },
      });

      res.status(200).json({ message: 'Route executed successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.error(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
