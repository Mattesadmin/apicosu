import Busboy from 'busboy';

export function parseForm(req: any): Promise<{ fileText: string; text: string }> {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({ headers: req.headers });

    let fileText = '';
    let text = '';

    busboy.on('file', (_, file) => {
      file.setEncoding('utf8');
      file.on('data', (data) => {
        fileText += data;
      });
    });

    busboy.on('field', (fieldname, val) => {
      if (fieldname === 'text') text = val;
    });

    busboy.on('finish', () => {
      resolve({ fileText, text });
    });

    busboy.on('error', reject);

    req.pipe(busboy);
  });
}
