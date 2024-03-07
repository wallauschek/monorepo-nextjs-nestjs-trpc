import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, Buffer.from('' + process.env.NEXT_PUBLIC_AT_PUBLIC_SECRET, 'base64').toString('ascii'), {
      algorithms: ['RS256']
  });
    return res.json({ valid: true, payload: decoded });
  } catch (err) {
    return res.status(401).json({ valid: false, message: 'Invalid token' });
  }
}