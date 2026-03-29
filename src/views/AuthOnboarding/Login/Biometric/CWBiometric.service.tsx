import ReactNativeBiometrics from 'react-native-biometrics'

const rnBiometrics = new ReactNativeBiometrics()

export const checkBiometricAvailability = async () => {
  try {
    const { available, biometryType } = await rnBiometrics.isSensorAvailable()

    return {
      available,
      biometryType,
    }
  } catch (error) {
    return {
      available: false,
      biometryType: null,
    }
  }
}

export const authenticateBiometric = async () => {
  try {
    const result = await rnBiometrics.simplePrompt({
      promptMessage: 'Login using Biometrics',
      fallbackPromptMessage: "Enter Passcode"
    })

    return result.success
  } catch (error) {
    return false
  }
}