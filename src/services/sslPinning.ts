// src/services/sslPinning.ts
import { initializeSslPinning, isSslPinningAvailable } from 'react-native-ssl-public-key-pinning';

export async function initSslPinning() {
  if (!isSslPinningAvailable()) {
    console.warn('SSL pinning not available');
    return;
  }
  await initializeSslPinning({
    'api.ticketmaster.com': {
      includeSubdomains: true,
      publicKeyHashes: ['BASE64_SHA256_HASH1', 'BASE64_SHA256_HASH2'],
    },
  });
  console.log('SSL pinning initialized');
}
