import type { VercelRequest, VercelResponse } from '@vercel/node';
import { runTraining } from '../src/modules/training';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = await runTraining(req as any);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error', details: err });
  }
}
