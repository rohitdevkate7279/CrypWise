import { StyleSheet, View } from "react-native";
import { useColors } from "../../theme/CWCustomTokenProvider";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../../navigation/MainStackNavigator";
import { RootStackParamList } from "../../navigation/types";

type CWSplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CWSplashScreen'>;

const CWSplashScreen = () => {
    const theme = useColors()
    const navigation = useNavigation<CWSplashScreenNavigationProp>();

    return (
        <View style={[style.container,{backgroundColor:theme.primary_background}]}>
 <LottieView
        source={require("//Users/chetanchougule/Documents/CrypWise/src/CWAssets/Bitcoin Halving.json")}
        autoPlay
        loop={false}
        resizeMode="contain"
        style={{width: '100%', height: '100%'}}
        onAnimationFinish={() => {
            navigation.replace("AuthStack", {
              screen: "CWIntroScreen",
            });
          }}
          
               />
        </View>
    );
};

export default CWSplashScreen;

const style = StyleSheet.create({
    container:{
        flex:1,
        padding:24,
        alignItems:"center",
        justifyContent:"center",
    }
})