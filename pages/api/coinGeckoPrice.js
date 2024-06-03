// pages/api/coinGeckoPrice.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Missing id parameter' });
  }

  try {
    const url = process.env.NEXT_PUBLIC_COINGECKO_API_URL + '/simple/price?ids=' + id + '&vs_currencies=usd';
    // console.log(url);
    const response = await fetch(url, {
      headers: {
        'accept': 'application/json',
        'x-cg-demo-api-key': process.env.COINGECKO_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching data from CoinGecko: ${response.statusText}`);
      console.log(response);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error)
  }
}
