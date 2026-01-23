// tokens/themeTokens.ts

// ---------- COLOR SCALE ----------
export type ColorScaleLevel = 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90

export type ColorScale = {
  [key in ColorScaleLevel]: string
} & {
  heading: string,
  inverse: string
  grey_100: string,
  grey_80: string,
  grey_60: string,
  grey_40: string,
  grey_20: string
}

// ---------- MODES ----------
export type ThemeVariant = 'light' | 'dark' 

// ---------- THEME MODE ----------
export type ThemeMode = {
  light: ColorScale
  dark: ColorScale
 
}

// ---------- PALETTES ----------
export type PaletteName = 'purple' 

// ---------- TOKENS TYPE ----------
export type ThemeTokensType = {
  [key in PaletteName]: ThemeMode
}

// ---------- TOKENS ----------
const themeTokens: ThemeTokensType = {
    purple: {
        light: {
            20: "#F5F0FF",
            30: "#E9DEFF",
            40: "#D6C4FF",
            50: "#B794F4",
            60: "#9F7AEA",
            70: "#805AD5",
            80: "#6B46C1",
            90: "#AEB9E1",
            heading: "#CB3CFF",
            inverse: "#FFFFFF",
            grey_100: "#141414",
            grey_80: "#000000A6",
            grey_60: "#B5B5B5",
            grey_40: "#E0E0E0",
            grey_20: "#F5F5F5",            
        },

        dark: {
            20: "#020617", // background
            30: "#0B122A", // surface / cards
            40: "#24113A",
            50: "#6D28D9", // primary CTA
            60: "#8B5CF6", // active states
            70: "#A78BFA",
            80: "#DDD6FE",
            90: "#AEB9E1",
            heading: "#CB3CFF",
            inverse: "#FFFFFF",
            grey_100: "#FFFFFF",
            grey_80: "#FFFFFFC7",
            grey_60: "#A1A1A1",
            grey_40: "#5A5A5A",
            grey_20: "#2B2B2B",
      
        },
    }
}

export default themeTokens
