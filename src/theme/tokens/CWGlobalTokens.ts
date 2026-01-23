// tokens/CWGlobalTokens.ts

import { ThemeVariant } from "./CWThemeToken"


type GlobalModeToken = {
  background: string
  white: string
  black: string
  transparent: string
  feedback_error_50: string
  feedback_success_50: string
  feedback_warning_50: string
}

const globalTokens: Record<ThemeVariant, GlobalModeToken> = {
  light: {
    background: "#FFFFFF",
    white: "#FFFFFF",
    black: "#000000",
    transparent: "transparent",
    feedback_error_50: "#EF4444",
    feedback_success_50: "#22C55E",
    feedback_warning_50: "#F59E0B",
  },
  dark: {
    background: "#020617",
    white: "#FFFFFF",
    black: "#000000",
    transparent: "transparent",
    feedback_error_50: "#F87171",
    feedback_success_50: "#4ADE80",
    feedback_warning_50: "#FBBF24",
  }
}

export default globalTokens
