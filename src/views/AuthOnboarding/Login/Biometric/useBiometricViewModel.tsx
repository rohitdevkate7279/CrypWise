import { useState, useEffect } from "react"
import { authenticateBiometric } from "./CWBiometric.service"
import { useTheme } from "../../../../theme/CWCustomTokenProvider"

const useBiometricViewModel = () => {
    const [isBiometricSuccess, setBiometricSuccess] = useState<boolean | null>(null)
    const theme = useTheme()
    async function handleBiometricAuth() {
        const success = await authenticateBiometric();
        if (success) {
            setBiometricSuccess(true)
            // Navigate to dashboard
        } else {
            setBiometricSuccess(false)
        }
    }

    return {
        theme,
        handleBiometricAuth
    }
}

export default useBiometricViewModel;