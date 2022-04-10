import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';
import { InvalidSaltHashError } from './salt-hash.error';

/**
 * @interface Hash
 */
export interface Hash {
  getHash: (content: string) => string;
  compareHash: (content: string, hashedContent: string) => boolean;
}

/**
 * @class SaltHash
 */
export class SaltHash implements Hash {
  constructor() {}

  public getHash(content: string): string {
    const salt = randomBytes(16).toString('hex');
    const hashedString = scryptSync(content, salt, 64).toString('hex');
    return `${salt}:${hashedString}`;
  }

  private validateSaltHashFormat(saltHash: string) {
    const key = saltHash.split(':')[1];
    if (!key) {
      throw new InvalidSaltHashError();
    }
  }

  public compareHash(content: string, saltHashedContent: string): boolean {
      this.validateSaltHashFormat(saltHashedContent);
    const [salt, key] = saltHashedContent.split(':');
    const hashedBuffer = scryptSync(content, salt, 64);
    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);
    return match;
  }
}
