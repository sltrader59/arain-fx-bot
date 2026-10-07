import { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

const SECRETS = {
  MASTER_KEY: 'JAFX-7777-ARAIN-9999',
  JWT_SECRET: 'cyber_matrix_token_hash_9921_x_junaid_arain'
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not permitted.' });
  }

  const { licenseKey, deviceFingerprint } = req.body;

  if (licenseKey === SECRETS.MASTER_KEY) {
    const sessionToken = jwt.sign(
      { hwid: deviceFingerprint, status: 'VALIDATED' },
      SECRETS.JWT_SECRET,
      { expiresIn: '12h' }
    );
    return res.status(200).json({
      success: true,
      token: sessionToken,
      expiresAt: Date.now() + 12 * 60 * 60 * 1000
    });
  }

  return res.status(403).json({ success: false, message: 'Invalid cryptographic key alignment.' });
}

