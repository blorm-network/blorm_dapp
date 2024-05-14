import { StargateClient } from '@cosmjs/stargate';

export async function transfer(fromChain, toChain, fromAddress, toAddress, amount, denom) {
  const client = await StargateClient.connect(fromChain.rpcUrl);
  const fee = {
    amount: [{ denom, amount: '5000' }],
    gas: '200000',
  };
  const result = await client.sendTokens(
    fromAddress,
    toAddress,
    [{ denom, amount }],
    fee,
    'Bridge Transfer'
  );
  return result;
}
