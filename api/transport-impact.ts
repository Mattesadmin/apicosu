import type { VercelRequest, VercelResponse } from '@vercel/node';
import { runTransportImpact } from '../src/modules/transport-impact';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = await runTransportImpact(req as any);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error', details: err });
  }
}
