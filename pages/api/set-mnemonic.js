// pages/api/set-mnemonic.js

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { mnemonic } = req.body;

    if (!mnemonic) {
      return res.status(400).json({ error: 'Mnemonic is required' });
    }

    try {
      const envPath = path.resolve(process.cwd(), '.env');
      const envFileContent = `MNEMONIC="${mnemonic}"\n`;
      fs.writeFileSync(envPath, envFileContent, { flag: 'w' });

      return res.status(200).json({ message: 'Mnemonic set successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to set mnemonic' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} not allowed`);
  }
}
