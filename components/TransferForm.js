import { useState } from 'react';
import { ethers } from 'ethers';
import { useProvider } from 'wagmi';

const TransferForm = () => {
  const [amount, setAmount] = useState('');
  const [cosmosAddress, setCosmosAddress] = useState('');
  const provider = useProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signer = provider.getSigner();
    const contract = new ethers.Contract('YOUR_ETH_CONTRACT_ADDRESS', [
      "function lockTokens(uint256 amount, string memory cosmosAddress) public"
    ], signer);
    const tx = await contract.lockTokens(ethers.utils.parseUnits(amount, 18), cosmosAddress);
    await tx.wait();
    console.log('Transaction completed:', tx);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <input type="text" value={cosmosAddress} onChange={(e) => setCosmosAddress(e.target.value)} placeholder="Cosmos Address" />
      <button type="submit">Lock Tokens</button>
    </form>
  );
};

export default TransferForm;
