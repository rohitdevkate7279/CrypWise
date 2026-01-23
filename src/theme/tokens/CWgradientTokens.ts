// tokens/gradientTokens.ts

import { PaletteName, ThemeVariant } from "./CWThemeToken"


type GradientPair = {
  start: string
  end: string
}

type GradientSet = {
  primary: GradientPair
  subtle: GradientPair
}

const gradientTokens: Record<
  PaletteName,
  Record<ThemeVariant, GradientSet>
> = {
  purple: {
    light: {
      primary: { start: "#C084FC", end: "#9333EA" },
      subtle: { start: "#F5E9FF", end: "#E9D5FF" },
    },
    dark: {
      primary: { start: "#9333EA", end: "#6D28D9" },
      subtle: { start: "#2A1739", end: "#3B1F56" },
    }
  }
}

export default gradientTokens
