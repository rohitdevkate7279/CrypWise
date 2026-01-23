import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useColors, useTheme } from '../theme/CWCustomTokenProvider';
import { MainStackParamList } from '../navigation/MainStackNavigator';
import CWText from '../CWComponents/CWText/CWText';
import { CWTypography } from '../CWComponents/CWText/CWTextType';
import CWTextInput from '../CWComponents/CWTextInput/CWTextInput';
import CWLoader from '../CWComponents/CWLoader/CWLoader';
import { CWLoaderAppearance, CWLoaderSize } from '../CWComponents/CWLoader/CWLoaderTypes';
import Svg, { Circle } from 'react-native-svg';
import CWButton from '../CWComponents/CWButtons/CWButton';
import { CWButtonState, CWButtonVariant } from '../CWComponents/CWButtons/CWButton.types';

type CWHomeScreenNavigationProp = StackNavigationProp<MainStackParamList, 'CWHome'>;

const CWHomeScreen = () => {
  const navigation = useNavigation<CWHomeScreenNavigationProp>();
  const theme = useTheme();
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.primary_background }]}>
      <CWText text='CrypWise' color={"heading"} appearance={CWTypography.HEADING_XL}/>
      <Text style={[styles.subtitle, { color: colors.primary_inverse }]}>
        Welcome to crypto world!
      </Text>
      
   


<CWButton
  title="Loader button"
  stretch
  onPress={() => {}}
  state={CWButtonState.LOADING}
  style={{marginBottom:50}}
/>

<CWButton
  title="Gradiant button"
  stretch
  onPress={() => {navigation.navigate("CWDummyScreen")}}
  style={{marginBottom:50}}
/>
<CWButton
  title="Solid button"
  stretch
  onPress={() => {}}
  variant={CWButtonVariant.SOLID}
/>
</View>

  );
};

function NormalSpinner() {
  return (
    <Svg width={50} height={50}>
      <Circle
        cx="25"
        cy="25"
        r="20"
        stroke="red"
        strokeWidth="4"
        fill="transparent"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  block: {
    height: 140,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  dark: {
    backgroundColor: "#1E1E2E",
  },
});

export default CWHomeScreen;

