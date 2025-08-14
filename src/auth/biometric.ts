import ReactNativeBiometrics from 'react-native-biometrics';
import * as Keychain from 'react-native-keychain';

const rnBiometrics = new ReactNativeBiometrics();

export async function isBiometricAvailable() {
  return await rnBiometrics.isSensorAvailable();
}

export async function promptBiometric() {
  const result = await rnBiometrics.simplePrompt({
    promptMessage: 'Confirm your identity',
  });
  return result.success;
}

export async function storeCredentials(username: string, token: string) {
  await Keychain.setGenericPassword(username, token, {
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
  });
}

export async function retrieveCredentials() {
  const creds = await Keychain.getGenericPassword();
  return creds ? creds : null;
}
