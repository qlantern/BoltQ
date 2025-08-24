// Browser-compatible crypto utilities using Web Crypto API

export const hashPassword = async (password: string): Promise<{ hash: string; salt: string }> => {
  // Generate random salt
  const saltArray = new Uint8Array(16);
  crypto.getRandomValues(saltArray);
  const salt = Array.from(saltArray, byte => byte.toString(16).padStart(2, '0')).join('');
  
  // Convert password to ArrayBuffer
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  const saltBuffer = encoder.encode(salt);
  
  // Import password as key material
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveBits']
  );
  
  // Derive key using PBKDF2
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: 1000,
      hash: 'SHA-512'
    },
    keyMaterial,
    512 // 64 bytes * 8 bits
  );
  
  // Convert to hex string
  const hashArray = new Uint8Array(derivedBits);
  const hash = Array.from(hashArray, byte => byte.toString(16).padStart(2, '0')).join('');
  
  return { hash, salt };
};

export const verifyPassword = async (password: string, hash: string, salt: string): Promise<boolean> => {
  // Convert password to ArrayBuffer
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  const saltBuffer = encoder.encode(salt);
  
  // Import password as key material
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveBits']
  );
  
  // Derive key using PBKDF2
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: 1000,
      hash: 'SHA-512'
    },
    keyMaterial,
    512 // 64 bytes * 8 bits
  );
  
  // Convert to hex string
  const hashArray = new Uint8Array(derivedBits);
  const verifyHash = Array.from(hashArray, byte => byte.toString(16).padStart(2, '0')).join('');
  
  return hash === verifyHash;
};

export const generateToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};