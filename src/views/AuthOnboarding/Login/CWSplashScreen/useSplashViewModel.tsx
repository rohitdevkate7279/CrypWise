import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppScreens } from "../../../../CWUtilities/CWConstants";

const useSplashViewModel = (navigation: NativeStackNavigationProp<any>) => {
  const handleAnimationFinish = () => {
    navigation.replace("CWAuthStack", { screenName: AppScreens.INTROSCREEN });
  };

  return {
    handleAnimationFinish,
  };
};

export default useSplashViewModel;
