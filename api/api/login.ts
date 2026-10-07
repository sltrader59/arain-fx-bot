import { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

const ADMIN_CONFIG = {
  USERNAME: 'Arain',
  PASSWORD: 'Arainfx5217',
  JWT_SECRET: 'cyber_matrix_token_hash_9921_x_junaid_arain'
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not permitted.' });
  }

  const { username, password } = req.body;

  if (username === ADMIN_CONFIG.USERNAME && password === ADMIN_CONFIG.PASSWORD) {
    const adminToken = jwt.sign({ role: 'ADMIN' }, ADMIN_CONFIG.JWT_SECRET, { expiresIn: '6h' });
    return res.status(200).json({ success: true, token: adminToken });
  }

  return res.status(401).json({ success: false, message: 'Invalid administrative operational vectors.' });
}
