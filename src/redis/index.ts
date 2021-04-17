import redis, { Redis } from 'ioredis';

export default class RedisConnection {
  private static redis: Redis;

  static connectToRedis(url: string): Redis {
    if (!this.redis) {
      this.redis = new redis(url);
      console.log('Redis initialized!');
    }

    return this.redis;
  }
}
