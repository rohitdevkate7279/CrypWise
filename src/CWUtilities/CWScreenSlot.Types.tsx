import { StyleProp, ViewStyle, StatusBarStyle, Animated } from "react-native"
import { SchematicState, Duration, ToastType } from "../CWComponents/CWToast/CWToast.Types"
import { AuthState } from "./CWAuthTypes"
import { IconKey } from "./IconUtility"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { NavigationBean } from "../navigation/CWNavGraph"

export type ScreenSlotProps = {
  navigationBean: NavigationBean
  navigation: NativeStackNavigationProp<any>,
  onCustomBackPress?: () => void
  onVisible?: () => void
  onBackPressCallback?: () => void
  headerIconsList?: HeaderIconProps
  toastTypeData?: ToastTypeData
  children?: (authState: AuthState,scrollY: Animated.Value) => React.ReactNode
  text?: string
  logo?: string
  showClose?: boolean
  showBack?: boolean
  showMore?: boolean;
  showAvatar?: boolean
  showHelp?: boolean;
  isFromProfileMenu?: boolean
  isOnBordingFlow?: boolean
  goToDahboard?: boolean,
  progressBarText?: string,
  onsuffixClick?: () => void,
  clearDataAndGoBack?: () => void,
  showNotification?: boolean,
  isLoading?: boolean;
  disableBack?: boolean;
  isFromForgotMpin?: boolean
  onCLickOfAvtar?: () => void
}

export type HeaderIconProps = {
  leftIconList: IconListModel[],
  rightIconList: IconListModel[]
}

export type DeeplinkProps = {
  navigationBean: NavigationBean | null
  navigation: NativeStackNavigationProp<any>,
  children?: (navBean: NavigationBean) => React.ReactNode
}

export type KeyboardProps = {
  nativeResize?: boolean,
  children?: React.ReactNode,
  behavior?: string
}

export enum HeaderType {
  HIDDEN = 0,
  VISIBLE = 1,
  CUSTOM = 2,
  HIDE_SUBTITLE = 3,
  DASHBOARD = 4,
}

export interface ToastTypeData {
  isVisible: boolean;
  message?: string;
  semanticState?: SchematicState;
  duration?: Duration;
  showClose?: boolean;
  type?: ToastType;
  offset?: number;
  genericToastType?: GenericToast;
  disableScreenTouch?: boolean;
  disableBackPress?: boolean;
  onDismiss?: () => void;
  viewStyle?: StyleProp<ViewStyle>;
  suffixIcon?: IconKey,
  suffixText?: string,
  onSuffixClick?: () => void
}

export enum GenericToast {
  NO_INTERNET,
  FETCHING_DETAILS,
  LOW_CONNECTIVITY,
  SUCCESS
}

export function getStatusBarStyle(darkMode: boolean = true): StatusBarStyle {
  return darkMode ? 'dark-content' : 'light-content'
}

export function genericToastTypeData(genericToastType: GenericToast, message: string | undefined = undefined,
  disableScreenTouch: boolean | undefined = undefined, disableBackPress: boolean | undefined = undefined): ToastTypeData | undefined {
  switch (genericToastType) {
    case GenericToast.FETCHING_DETAILS: {
      return {
        isVisible: true,
        message: message ?? "Fetching details...",
        semanticState: SchematicState.INFO,
        duration: Duration.PERSIST,
        type: ToastType.SPINNER,
        disableScreenTouch: disableScreenTouch ?? true,
        disableBackPress: disableBackPress ?? false
      }
    }
    case GenericToast.NO_INTERNET: {
      return {
        isVisible: true,
        message: message ?? "Internet not available",
        semanticState: SchematicState.INFO,
        duration: Duration.PERSIST,
        type: ToastType.NONE,
        genericToastType: GenericToast.NO_INTERNET,
        disableScreenTouch: disableScreenTouch ?? true,
        disableBackPress: disableBackPress ?? false,
        viewStyle: { marginBottom: 24 }
      }
    }
    case GenericToast.LOW_CONNECTIVITY: {
      return {
        isVisible: true,
        message: message ?? "Low internet connectivity",
        semanticState: SchematicState.INFO,
        duration: Duration.PERSIST,
        type: ToastType.NONE,
        genericToastType: GenericToast.LOW_CONNECTIVITY,
        disableScreenTouch: disableScreenTouch ?? true,
        disableBackPress: disableBackPress ?? false
      }
    }
    case GenericToast.SUCCESS: {
      return {
        isVisible: true,
        message: message ?? "",
        semanticState: SchematicState.SUCCESS,
        duration: Duration.MEDIUM,
        type: ToastType.NONE,
        disableScreenTouch: disableScreenTouch ?? true,
        disableBackPress: disableBackPress ?? false
      }
    }
    default: {
      return undefined
    }
  }
}