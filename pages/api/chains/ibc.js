// pages/api/ibc-chains.js
import sdk from '@api/skip-ibc-api';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const data = await sdk.getAssets();
            res.status(200).json(data.data);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching chains' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}