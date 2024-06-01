// pages/api/find-route.js

import { SkipRouter } from "@skip-router/core";
import * as chainRegistry from "chain-registry";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { sourceAssetDenom, sourceAssetChainID, destAssetDenom, destAssetChainID, amountIn, smartSwapOptions } = req.body;

    const skipClient = new SkipRouter();

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
