import https from 'https';
import { HttpException } from '../exceptions';

const BASE_URL = 'partners.betvictor.mobi';

export const getEvents = async () => {
  const options = {
    hostname: BASE_URL,
    port: 443,
    path: '/en-gb/in-play/1/eventss',
    method: 'GET'
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new HttpException(res.statusCode, res.statusMessage));
      }

      const data = [];

      res.on('data', (d) => {
        data.push(d);
      });

      res.on('end', () => resolve(JSON.parse(Buffer.concat(data).toString())));
    });

    req.on('error', reject);

    req.end();
  });
};
