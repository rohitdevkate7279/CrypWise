import { NativeStackScreenProps } from "@react-navigation/native-stack";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";
import { AppScreens } from "../../../../CWUtilities/CWConstants";
import { useColors } from "../../../../theme/CWCustomTokenProvider";
import useSplashViewModel from "./useSplashViewModel";

type Props = NativeStackScreenProps<any, AppScreens.SPLASHSCREEN>;

const CWSplashScreen = ({ navigation }: Props) => {
  const theme = useColors();
  const { handleAnimationFinish } = useSplashViewModel(navigation);

  return (
    <View style={[style.container, { backgroundColor: theme.primary_background }]}>
      <LottieView
        source={require("../../../../CWAssets/Bitcoin Halving.json")}
        autoPlay
        loop={false}
        resizeMode="contain"
        style={{ width: "100%", height: "100%" }}
        onAnimationFinish={handleAnimationFinish}
      />
    </View>
  );
};

export default CWSplashScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
