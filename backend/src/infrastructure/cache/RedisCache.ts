import { createClient } from 'redis';

export class RedisCache {
  private client;

  constructor() {
    this.client = createClient();
    this.client.connect().catch(err => {
      console.error('Redis connection failed:', err);
    });
  }

  async set(key: string, value: any, expirationTime: number = 3600): Promise<void> {
    try {
      await this.client.set(key, JSON.stringify(value), {
        EX: expirationTime
      });
    } catch (error) {
      console.error('Redis set failed:', error);
    }
  }

  async get(key: string): Promise<any | null> {
    try {
      const value = await this.client.get(key);
      if (value) {
        return JSON.parse(value);
      }
    } catch (error) {
      console.error('Redis get failed:', error);
    }
    return null;
  }

  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error('Redis delete failed:', error);
    }
  }
}
