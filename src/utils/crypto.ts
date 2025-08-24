import { Buffer } from 'buffer';
import { pbkdf2Sync, randomBytes } from 'crypto';

export const hashPassword = (password: string): { hash: string; salt: string } => {
  const salt = randomBytes(16).toString('hex');
  const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { hash, salt };
};

export const verifyPassword = (password: string, hash: string, salt: string): boolean => {
  const verifyHash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
};

export const generateToken = (): string => {
  return randomBytes(32).toString('hex');
};
