import { Platform } from "react-native";
import { AppScreens } from "./CWNavigationConstants";
import { HeaderType } from "../CWUtilities/CWScreenSlot.Types";
import { CWSharedViewModel } from "../CWUtilities/CWSharedViewModel";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export let navGraph = new Map<string, string>([
  [AppScreens.AUTHSTACK, AppScreens.AUTHSTACK],
  [AppScreens.INTROSCREEN, AppScreens.AUTHSTACK],
  [AppScreens.LOGIN_SCREEN, AppScreens.AUTHSTACK],
  [AppScreens.LOGIN_OTP_SCREEN, AppScreens.AUTHSTACK],
  [AppScreens.SPLASHSCREEN, AppScreens.SPLASHSCREEN],
  [AppScreens.BIOMETRIC_SCREEN, AppScreens.AUTHSTACK],
  [AppScreens.MPIN_SCREEN,AppScreens.AUTHSTACK],
  [AppScreens.CONFIRM_MPIN_SCREEN,AppScreens.AUTHSTACK],
  [AppScreens.SIGNUP_SCREEN, AppScreens.AUTHSTACK]
])

export type NavigationStackData = {
  CWMainStack: NavigationBean,
  CWSplashScreen: NavigationBean
  CWAuthStack: NavigationBean
  CWIntroScreen: NavigationBean
  CWLoginScreen: NavigationBean
  CWLoginOTPScreen :NavigationBean
  CWBiometric: NavigationBean
  CWMpinSCreen: NavigationBean
  CWConfirmMpinScreen: NavigationBean
  CWSignupScreen: NavigationBean
};

export interface NavigationBean {
  navTitle?: string;
  logo?: string;
  destination: string;
  loginRequired?: boolean;
  actionUrl?: string;
  actionType: string;
  headerVisibility?: HeaderType;
  bundle?: string;
  userAuthenticationRequired?: number;
  tokenType?: TokenType;
  params?: any;
  onBoardingRequired?: boolean;
  showBnb?: boolean;
  versionType?: number;
  versionCode?: number;
  appVersion?: string;
  iconUrl?: string;
  title?: string;
  visibilityType?: string;
  screenName?: string;
  shouldCheckKYCStatus?: boolean;
  isWebviewBack?: boolean;
  isFolioAndBankRequired?: boolean;
  showHelp?: boolean;
  file?: string;
}

export enum TokenType {
  GENERAL_TOKEN = 0,
  SPECIAL_TOKEN = 1,
}

export function navigationBeanObj({
  actionType,
  destination = '',
  actionUrl = '',
  userAuthenticationRequired = 2,
  navTitle = '',
  logo = '',
  headerVisibility = HeaderType.VISIBLE,
  loginRequired = false,
  params = null,
  bundle = '',
  onBoardingRequired = false,
  showBnb = false,
  screenName = '',
  shouldCheckKYCStatus,
  isFolioAndBankRequired,
  showHelp,
}: NavigationBean): NavigationBean {
  return {
    navTitle: navTitle,
    logo: logo,
    destination: destination,
    loginRequired: loginRequired,
    actionUrl: actionUrl,
    actionType: actionType,
    headerVisibility: headerVisibility,
    bundle: bundle,
    userAuthenticationRequired: userAuthenticationRequired,
    params: params,
    onBoardingRequired: onBoardingRequired,
    showBnb: showBnb,
    screenName: screenName,
    shouldCheckKYCStatus: shouldCheckKYCStatus,
    isFolioAndBankRequired: isFolioAndBankRequired,
    showHelp: showHelp,
  };
}

export function navigationBeanCopy(navBean: NavigationBean): NavigationBean {
  return {
    navTitle: navBean.navTitle,
    destination: navBean.destination,
    loginRequired: navBean.loginRequired,
    actionUrl: navBean.actionUrl,
    actionType: navBean.actionType,
    headerVisibility: navBean.headerVisibility,
    bundle: navBean.bundle,
    params: navBean.params,
    onBoardingRequired: navBean.onBoardingRequired
  };
}

export enum ActionType {
  OPEN_NATIVE = "T001",
  OPEN_EXTERNAL = "T002",
  OPEN_DEEPLINK = "T004",
  OPEN_WEB_URL = 'T003',
  OPEN_WEB_URL_WITH_TOKEN = 'T006',
  OPEN_WEB_HTML = 'T005',
  OPEN_DEVICE_APPS = 'T007',
  OPEN_JFS_DEEPLINK = 'T008'

}

export interface DummyBean {
  mobileNumber: string;
  mailId: string;
}

export interface CommonDataBean {
  title: string;
  subtitle: string;
  callActionLink: string;
  headerTitle: string;
}

export async function redirectToLoginScreen(navigation: NativeStackNavigationProp<any>) {
  const bean = navigationBeanObj({ actionType: ActionType.OPEN_NATIVE, destination: AppScreens.LOGIN_SCREEN, actionUrl: "" })
  try {
    // await clearInvestmentAsyncDataBase()
  } catch (e) {
    console.log(e, "error while clearing data base")
  }
  const state = navigation.getState();
  const navObj = state.routes.find(
    item => item.name === bean.destination,
  );

  if (navObj !== undefined) {
    navigation.dispatch({
      type: 'NAVIGATE',
      payload: {
        name: bean.destination,
        merge: true,
        params: undefined,
      },
    });
  } else {
    navigation.reset({ index: 0, routes: [{ name: AppScreens.AUTHSTACK }] })
  }
}

export function popUpToRequiredDestinationAndNavigate(
  navigation: NativeStackNavigationProp<any>,
  navigationBean: NavigationBean,
  keepSameParams: boolean = true,
) {
  // if (!CWSharedViewModel.Instance.networkAvailable) return
  const state = navigation.getState();
  const navObj = state.routes.find(
    item => item.name === navigationBean.destination,
  );
  if (navObj !== undefined) {
    navigation.dispatch({
      type: 'NAVIGATE',
      payload: {
        name: navigationBean.destination,
        merge: keepSameParams,
        params: keepSameParams === true ? undefined : navigationBean,
      },
    });
  } else if (navigationBean) {
    openNativeNavigation(navigationBean, navigation);
  }
}

export function navigateTo(
  navigationBean: NavigationBean,
  navigation: NativeStackNavigationProp<any>,
  isDeeplink: boolean = false,
  usePush: boolean = false
) {

  console.debug("openNativeNavigation", navigationBean)

  // if (!CWSharedViewModel.Instance.networkAvailable) return

  // if (navigationBean.gaModel) {
  //   AnalyticsUtility.Instance.callFirebaseAnalytics(navigationBean.gaModel)
  // }
  switch (navigationBean.actionType) {
    case ActionType.OPEN_NATIVE: {
      openNativeNavigation(navigationBean, navigation, isDeeplink, usePush);
      break
    }
    case ActionType.OPEN_WEB_URL:
    case ActionType.OPEN_WEB_HTML:
    case ActionType.OPEN_WEB_URL_WITH_TOKEN: {
      if (
        navigationBean?.file &&
        navigationBean?.file?.toLowerCase().endsWith('.pdf')
      ) {
        openNativeNavigation(
          {
            ...navigationBean,
            actionUrl: Platform.OS === 'android' 
              ? `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
                  navigationBean?.file ?? '',
                )}`
              : navigationBean?.file ?? '',
          },
          navigation,
          isDeeplink,
          usePush,
        )
      } else {
        openNativeNavigation(navigationBean, navigation, isDeeplink, usePush);
      }
      break
    }
    case ActionType.OPEN_EXTERNAL: {
    }
    case ActionType.OPEN_DEEPLINK: {
      // updateDeeplinkNavBean(navigationBean?.actionUrl ?? "", (bean) => {
      //   if (bean) {
      //     navigateTo(bean, navigation);
      //   }
      // })
      break;
    }
    default: {
      break;
    }
  }
}

function openNativeNavigation(
  navigationBean: NavigationBean,
  navigation: NativeStackNavigationProp<any>,
  isDeeplink: boolean = false,
  usePush: boolean = false,
) {

  const mainDestination = navGraph.get(navigationBean.destination ?? '') || '';
  

  if (mainDestination.length != 0) {
    if (
      navigationBean?.loginRequired &&
      !CWSharedViewModel.Instance.loggedInStatus
    ) {
      navigateTo({
        actionType: ActionType.OPEN_NATIVE,
        destination: AppScreens.LOGIN_SCREEN,
        headerVisibility: HeaderType.VISIBLE,
        navTitle:
          '',
        actionUrl: '',
        params: {
        },
      },
        navigation,
        isDeeplink,
      );
    } else {

            if (mainDestination === navigationBean.destination) {
              isDeeplink
                ? navigation.reset({
                  index: 0,
                  routes: [{ name: mainDestination, params: navigationBean }],
                })
                : usePush
                  ? navigation.push(mainDestination, navigationBean)
                  : navigation.navigate(mainDestination, navigationBean);
            } else {
              isDeeplink
                ? navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: mainDestination,
                      params: {
                        screen: navigationBean.destination,
                        params: navigationBean,
                      },
                    },
                  ],
                })
                : usePush
                  ? navigation.push(mainDestination, {
                    screen: navigationBean.destination,
                    params: navigationBean,
                  })
                  : navigation.navigate(mainDestination, {
                    screen: navigationBean.destination,
                    params: navigationBean,
                  });
            }
           
          }
        }

      }




