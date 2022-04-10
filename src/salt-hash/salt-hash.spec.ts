import { SaltHash, Hash } from './salt-hash';

const ANY_STRING: string = 'any_string';
const INVALID_SALT_HASH_FORMAT: string = 'any';
const VALID_SALT_HASH_FORMAT: string = `f40fdf1fe3f5ac53:f40fdf1fe3f5ac53`;

let saltHash: Hash;

describe('SaltHash', () => {
  beforeAll(() => {
    saltHash = new SaltHash();
  })

  describe('getHash()', () => {
    it('should be able to get hashed content', () => {
      const hash = saltHash.getHash(ANY_STRING);
      expect(!!hash).toBe(true);
    })
  })

  describe('compareHash()', () => {
    it('should be throw new InvalidSaltHashError if hash param is not valid', () => {
      try {
        saltHash.compareHash(ANY_STRING, INVALID_SALT_HASH_FORMAT);
      } catch (e) {
        expect(e.name).toBe('InvalidSaltHashError');
      }
    })

    it('should be return true if content and hash are equal', () => {
      const hash = saltHash.getHash(ANY_STRING);
      const isTheSame = saltHash.compareHash(ANY_STRING, hash);
      expect(isTheSame).toBe(true);
    })

    it('should be return false if content and hash not equal', async () => {
      const isTheSame = saltHash.compareHash(ANY_STRING, VALID_SALT_HASH_FORMAT);
      await expect(isTheSame).toBe(false);
    })
  })
})


