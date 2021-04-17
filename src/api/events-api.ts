import https, { RequestOptions } from 'https';
import { Redis } from 'ioredis';

import { HttpException } from '../exceptions';
import { ELanguages } from '../interfaces';

export default class EventsApi {
  baseUrl: string;
  redis: Redis;

  constructor(baseUrl, redis) {
    this.baseUrl = baseUrl;
    this.redis = redis;
  }

  async getRawEvents(lang: ELanguages = ELanguages.ENGLISH): Promise<any> {
    const options: RequestOptions = {
      hostname: this.baseUrl,
      port: 443,
      path: `/${lang}/in-play/1/events`,
      method: 'GET'
    };

    let rawEvents = await this.redis.get(options.path);

    if (!rawEvents) {
      rawEvents = await new Promise((resolve, reject) => {
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

      await this.redis.set(options.path, JSON.stringify(rawEvents), 'EX', 10);
    } else {
      rawEvents = JSON.parse(rawEvents.toString());
    }

    return rawEvents;
  }
}
