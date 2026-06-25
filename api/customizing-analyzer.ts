import { runCustomizingAnalyzer } from '../src/modules/customizing-analyzer';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  try {
    const result = await runCustomizingAnalyzer(req);
    res.statusCode = 200;
    return res.end(JSON.stringify(result));
  } catch (err) {
    res.statusCode = 500;
    return res.end(JSON.stringify({ error: 'Internal server error', details: err }));
  }
}
