import sdk from '@api/skip-ibc-api';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const request = req.body;

      // code here
      
      res.status(200).json(data);
      
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ error: error || 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
