import React, { createContext, useContext, ReactNode } from "react"
import globalTokens from "./tokens/CWGlobalTokens"
import gradientTokens from "./tokens/CWgradientTokens"
import themeTokens, { ThemeVariant, PaletteName } from "./tokens/CWThemeToken"

// ---------- TYPES ----------
export type ColorToken = {
  primary_80: string
  primary_70: string
  primary_60: string
  primary_50: string
  primary_40: string
  primary_30: string
  primary_20: string
  primary_90: string
  grey_100: string,
  grey_80: string,
  grey_60: string,
  grey_40: string,
  grey_20: string,
  heading: string
  primary_inverse: string
  primary_link:string
  primary_background: string
  feedback_error: string
  feedback_success: string
  feedback_warning: string
  white: string
  black: string
  transparent: string
}

export type GradientToken = {
  primary_gradient: string[]
  subtle_gradient: string[]
}

type CustomTokenContextValue = {
  colors: ColorToken
  gradients: GradientToken
  mode: ThemeVariant
}

type ProviderProps = {
  value: {
    primary: PaletteName
    mode: ThemeVariant
  }
  children: ReactNode
}

// ---------- CONTEXT ----------
const CustomTokenContext = createContext<CustomTokenContextValue | undefined>(
  undefined
)

// ---------- PROVIDER ----------
export const CustomTokenProvider: React.FC<ProviderProps> = ({
  children,
  value,
}) => {
  const { primary, mode } = value

  const colorTheme: ColorToken = {
    primary_90: themeTokens[primary][mode][90],
    primary_80: themeTokens[primary][mode][80],
    primary_70: themeTokens[primary][mode][70],
    primary_60: themeTokens[primary][mode][60],
    primary_50: themeTokens[primary][mode][50],
    primary_40: themeTokens[primary][mode][40],
    primary_30: themeTokens[primary][mode][30],
    primary_20: themeTokens[primary][mode][20],
    grey_100: themeTokens[primary][mode]["grey_100"],
    grey_80: themeTokens[primary][mode]["grey_80"],
    grey_60: themeTokens[primary][mode]["grey_60"],
    grey_40: themeTokens[primary][mode]["grey_40"],
    grey_20: themeTokens[primary][mode]["grey_20"],
    heading: themeTokens[primary][mode].heading,
    primary_inverse: themeTokens[primary][mode].inverse,

    primary_background: globalTokens[mode].background,


    feedback_error: globalTokens[mode].feedback_error_50,
    feedback_success: globalTokens[mode].feedback_success_50,
    feedback_warning: globalTokens[mode].feedback_warning_50,

    white: globalTokens[mode].white,
    black: globalTokens[mode].black,
    transparent: globalTokens[mode].transparent,
    primary_link :themeTokens[primary][mode]["link"]
  }

  const gradients: GradientToken = {
    primary_gradient: [
      gradientTokens[primary][mode].primary.start,
      gradientTokens[primary][mode].primary.end,
    ],
    subtle_gradient: [
      gradientTokens[primary][mode].subtle.start,
      gradientTokens[primary][mode].subtle.end,
    ],
  }

  return (
    <CustomTokenContext.Provider
      value={{ colors: colorTheme, gradients, mode }}
    >
      {children}
    </CustomTokenContext.Provider>
  )
}

// ---------- HOOKS ----------
export const useTheme = () => {
  const ctx = useContext(CustomTokenContext)
  if (!ctx) {
    throw new Error("useTheme must be used inside CustomTokenProvider")
  }
  return ctx
}

export const useColors = () => useTheme().colors
export const useGradients = () => useTheme().gradients
export const useMode = () => useTheme().mode
