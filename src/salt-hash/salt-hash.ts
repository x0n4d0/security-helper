import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';

export function getHashFrom(anyString: string): string {
  const salt = randomBytes(16).toString('hex');
  const hashedString = scryptSync(anyString, salt, 64).toString('hex');
  return `${salt}:${hashedString}`;
}

export function compareWithHash(anyString: string, saltHashedStr: string): boolean {
  const [salt, key] = saltHashedStr.split(':');
  const hashedBuffer = scryptSync(anyString, salt, 64);
  const keyBuffer = Buffer.from(key, 'hex');
  const match = timingSafeEqual(hashedBuffer, keyBuffer);
  return match;
}
