export default function handler(req, res) {
  const ethereumChains = [
    {
      "name": "Ethereum Mainnet",
      "chain": "ETH",
      "icon": "ethereum",
      "rpc": [
        "https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}",
        "wss://mainnet.infura.io/ws/v3/${process.env.INFURA_API_KEY}",
        "https://api.mycryptoapi.com/eth",
        "https://cloudflare-eth.com",
        "https://ethereum-rpc.publicnode.com",
        "wss://ethereum-rpc.publicnode.com",
        "https://mainnet.gateway.tenderly.co",
        "wss://mainnet.gateway.tenderly.co",
        "https://rpc.blocknative.com/boost",
        "https://rpc.flashbots.net",
        "https://rpc.flashbots.net/fast",
        "https://rpc.mevblocker.io",
        "https://rpc.mevblocker.io/fast",
        "https://rpc.mevblocker.io/noreverts",
        "https://rpc.mevblocker.io/fullprivacy",
        "https://eth.drpc.org",
        "wss://eth.drpc.org"
      ],
      "features": [{ "name": "EIP155" }, { "name": "EIP1559" }],
      "faucets": [],
      "nativeCurrency": {
        "name": "Ether",
        "symbol": "ETH",
        "decimals": 18
      },
      "infoURL": "https://ethereum.org",
      "shortName": "eth",
      "chainId": 1,
      "networkId": 1,
      "slip44": 60,
      "ens": {
        "registry": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
      },
      "explorers": [
        {
          "name": "etherscan",
          "url": "https://etherscan.io",
          "standard": "EIP3091"
        },
        {
          "name": "blockscout",
          "url": "https://eth.blockscout.com",
          "icon": "blockscout",
          "standard": "EIP3091"
        },
        {
          "name": "dexguru",
          "url": "https://ethereum.dex.guru",
          "icon": "dexguru",
          "standard": "EIP3091"
        }
      ]
    }
  ];

  res.status(200).json(ethereumChains);
}
