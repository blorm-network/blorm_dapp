const sdk = require('@api/skip-ibc-api');

const route = sdk.getRouteV2({
  amount_in: '1000000',
  source_asset_denom: 'uusdc',
  source_asset_chain_id: 'axelar-dojo-1',
  dest_asset_denom: 'uatom',
  dest_asset_chain_id: 'cosmoshub-4',
  cumulative_affiliate_fee_bps: '0',
  allow_multi_tx: true
});

console.log('route:', route);

const messages = sdk.getMsgsV2(route);

console.log('messages:', messages);
