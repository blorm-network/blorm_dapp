// pages/api/execute-route.js

import { SkipRouter } from "@skip-router/core";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { route, addresses } = req.body;

    const skipClient = new SkipRouter();

    try {
      await skipClient.executeRoute({
        route,
        userAddresses: Object.entries(addresses).map(([chainID, address]) => ({ chainID, address })),
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
