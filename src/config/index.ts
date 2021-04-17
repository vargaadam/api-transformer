import 'dotenv/config';
import { cleanEnv, str, num, CleanedEnvAccessors } from 'envalid';

export interface IConfig extends CleanedEnvAccessors {
  APP_PORT: number;
  APP_DOMAIN: string;
  NODE_ENV: string;
  EVENTS_API_BASE_URL: string;
  REDIS_URL: string;
}

export default class Config {
  private static config: IConfig;

  static getConfig(): IConfig {
    if (!this.config) {
      this.config = cleanEnv(process.env, {
        APP_PORT: num({ default: 3000 }),
        APP_DOMAIN: str({ default: 'localhost' }),
        NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'], default: 'development' }),
        EVENTS_API_BASE_URL: str({ default: 'partners.betvictor.mobi' }),
        REDIS_URL: str({ default: 'redis' })
      });
    }

    return this.config;
  }
}
