import { parseForm } from './_parseForm';
import { runErrorFinder } from '../src/modules/error-finder';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  try {
    const { fileText, text } = await parseForm(req);
    const combined = `${fileText}\n${text}`.trim();

    const result = await runErrorFinder({ combined });

    res.statusCode = 200;
    return res.end(JSON.stringify(result));
  } catch (err) {
    res.statusCode = 500;
    return res.end(JSON.stringify({ error: 'Internal server error', details: err }));
  }
}
