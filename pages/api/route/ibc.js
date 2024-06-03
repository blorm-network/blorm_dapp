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
        cumulative_affiliate_fee_bps: '0',
        allow_unsafe: true,
        allow_multi_tx: true,
        experimental_features: ['CCTP'],
        smart_relay: true,
        allow_swaps: true,
        smart_swap_options: {split_routes: true}
      });
      res.status(200).json(route);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.error('Error fetching route:', error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
