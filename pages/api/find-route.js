// pages/api/find-route.js

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

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { sourceAssetDenom, sourceAssetChainID, destAssetDenom, destAssetChainID, amountIn, smartSwapOptions } = req.body;

    const skipClient = new SkipRouter({ getCosmosSigner });

    try {
      const route = await skipClient.route({
        sourceAssetDenom,
        sourceAssetChainID,
        destAssetDenom,
        destAssetChainID,
        amountIn,
        smartSwapOptions,
      });
      res.status(200).json(route);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
