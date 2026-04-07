import { useRef, useState } from "react";
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppScreens } from "../../../../CWUtilities/CWConstants";
import { NavigationStackData, navigateTo, ActionType } from "../../../../navigation/CWNavGraph";

export interface IntroItem {
  heading: string;
  subHeading: string;
}

export const INTRO_DATA: IntroItem[] = [
  {
    heading: "Invest Smarter, Trade Faster, Earn More",
    subHeading:
      "Access top coins, track performance, and make informed decisions with lightning-fast crypto tools.",
  },
  {
    heading: "All Your Crypto. One Powerful App",
    subHeading: "Monitor prices, manage portfolios, and stay ahead of the market effortlessly.",
  },
  {
    heading: "Lightning-Fast Trades, Zero Hassle",
    subHeading: "Execute trades instantly with secure and reliable infrastructure.",
  },
];

const useIntroViewModel = (
  navigation: NativeStackNavigationProp<NavigationStackData>,
  screenWidth: number
) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList>(null);
  const autoScrollRef = useRef<number | null>(null);

  const startAutoScroll = () => {
    if (autoScrollRef.current !== null) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }

    autoScrollRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = (prev + 1) % INTRO_DATA.length;

        listRef.current?.scrollToOffset({
          offset: nextIndex * screenWidth,
          animated: true,
        });

        return nextIndex;
      });
    }, 4000);
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current !== null) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
    setActiveIndex(index);
    startAutoScroll();
  };

  const handleGetStarted = () => {
    navigateTo(
      {
        actionType: ActionType.OPEN_NATIVE,
        destination: AppScreens.LOGIN_SCREEN,
        params: {},
      },
      navigation
    );
  };

  return {
    activeIndex,
    listRef,
    startAutoScroll,
    stopAutoScroll,
    onScrollEnd,
    handleGetStarted,
  };
};

export default useIntroViewModel;
