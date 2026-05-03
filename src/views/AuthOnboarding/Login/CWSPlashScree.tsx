import { NativeStackScreenProps } from "@react-navigation/native-stack";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";
import { AppScreens } from "../../../navigation/CWNavigationConstants";
import { useColors } from "../../../theme/CWCustomTokenProvider";

type Props = NativeStackScreenProps<any, AppScreens.SPLASHSCREEN>;

const CWSplashScreen = ({ navigation, route }: Props) => {
    const theme = useColors()

    return (
        <View style={[style.container, { backgroundColor: theme.primary_background }]}>
            <LottieView
                source={require("//Users/chetanchougule/Documents/CrypWise/src/CWAssets/Bitcoin Halving.json")}
                autoPlay
                loop={false}
                resizeMode="contain"
                style={{ width: '100%', height: '100%' }}
                onAnimationFinish={() => {
                    navigation.replace("CWAuthStack", { screenName: AppScreens.INTROSCREEN })
                }}
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
    }
})