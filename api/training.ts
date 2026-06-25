import { runTraining } from '../src/modules/training';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const text = formData.get('text') as string | null;

    const fileText = file ? await file.text() : '';
    const combined = `${fileText}\n${text || ''}`.trim();

    const result = await runTraining({ combined });

    res.statusCode = 200;
    return res.end(JSON.stringify(result));
  } catch (err) {
    res.statusCode = 500;
    return res.end(JSON.stringify({ error: 'Internal server error', details: err }));
  }
}
