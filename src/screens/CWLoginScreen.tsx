import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useColors } from '../theme/CWCustomTokenProvider';
import { AuthStackParamList } from '../navigation/AuthStackNavigator';

type CWLoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'CWLogin'>;

const CWLoginScreen = () => {
  const navigation = useNavigation<CWLoginScreenNavigationProp>();
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.primary_background }]}>
      <Text style={[styles.title, { color: colors.primary_80 }]}>CW Login Screen</Text>
      <Text style={[styles.subtitle, { color: colors.primary_60 }]}>
        Auth Stack Navigator
      </Text>
      
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary_50 }]}
        onPress={() => navigation.navigate('CWSignUp')}
      >
        <Text style={[styles.buttonText, { color: colors.primary_inverse }]}>
          Go to Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

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
});

export default CWLoginScreen;

