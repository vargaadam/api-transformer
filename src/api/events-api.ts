import https, { RequestOptions } from 'https';
import { HttpException } from '../exceptions';

export default class EventsApi {
  options: RequestOptions;

  constructor(baseUrl) {
    this.options = {
      hostname: baseUrl,
      port: 443,
      path: '/en-gb/in-play/1/events',
      method: 'GET'
    };
  }

  getRawEvents(): Promise<any> {
    return new Promise((resolve, reject) => {
      const req = https.request(this.options, (res) => {
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
  }
}
