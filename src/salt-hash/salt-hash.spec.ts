import { compareWithHash, getHashFrom } from './salt-hash';

let hashedStr: string;
let isTheSameStr: boolean;

const ANY_STRING: string = 'any_string';
const ANY_INVALID_STRING: string = 'invalid_string';

describe('salt-hash', () => {

  describe('getHashFrom', () => {
    it('should be able to generate hash from one string', () => {
      hashedStr = getHashFrom(ANY_STRING);
      const isHashedStrGreaterThanStr = hashedStr.length > ANY_STRING.length;
      expect(isHashedStrGreaterThanStr).toBe(true);
    })
  })

  describe('compareWithHash', () => {
    it('should be return true if string and hashed string is the same', () => {
      hashedStr = getHashFrom(ANY_STRING);
      isTheSameStr = compareWithHash(ANY_STRING, hashedStr);
      expect(isTheSameStr).toBe(true);
    })

    it('should be return false if string and hashed string is not the same', () => {
      hashedStr = getHashFrom(ANY_STRING);
      isTheSameStr = compareWithHash(ANY_INVALID_STRING, hashedStr);
      expect(isTheSameStr).toBe(false);
    })
  })
})


