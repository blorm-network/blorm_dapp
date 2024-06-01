// pages/api/skip-route.js
import sdk from '@api/skip-ibc-api';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amountIn, sourceAssetDenom, sourceAssetChainId, destAssetDenom, destAssetChainId } = req.body;

    try {
      const routeResponse = await sdk.getRouteV2({
        amount_in: amountIn,
        source_asset_denom: sourceAssetDenom,
        source_asset_chain_id: sourceAssetChainId,
        dest_asset_denom: destAssetDenom,
        dest_asset_chain_id: destAssetChainId,
        cumulative_affiliate_fee_bps: '0',
        allow_unsafe: true,
        allow_multi_tx: true,
        experimental_features: ['CCTP']
      });

      res.status(200).json(routeResponse);
    } catch (e) {
      console.error('Error fetching route:', e);

      res.status(500).json({ error: e.data.code, message: e.data.message});
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
