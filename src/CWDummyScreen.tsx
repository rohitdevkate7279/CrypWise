import { StatusBar, StyleSheet, Text, View } from "react-native";
import { useColors, useTheme } from "./theme/CWCustomTokenProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CWLoader from "./CWComponents/CWLoader/CWLoader";
import { CWLoaderSize } from "./CWComponents/CWLoader/CWLoaderTypes";


const CWDummyScreen = () => {
    const theme = useTheme();
    return (
        <SafeAreaProvider style={{borderColor:'red'}}>

        <StatusBar barStyle={'dark-content'} backgroundColor={"red"} />

        <View style={[styles.container, { backgroundColor: theme?.colors?.primary_20 }]}>
        <CWLoader size={CWLoaderSize.MEDIUM}/>
        </View>
        </SafeAreaProvider>
    )
}

export default CWDummyScreen;
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})