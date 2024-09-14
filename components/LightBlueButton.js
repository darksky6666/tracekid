import React from 'react';
import { TouchableOpacity, Text, Vibration, StyleSheet } from 'react-native';
import { colors } from '../constants/Colors';

const LightBlueButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        Vibration.vibrate(50);
        if (onPress) {
          onPress();
        }
      }}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.lightBlue,
    padding: 16,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontFamily: 'Shift-Type-Basic',
    fontSize: 22,
    color: colors.textBtmSheet,
  },
});

export default LightBlueButton;
