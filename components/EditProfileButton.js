import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/Colors';

const EditProfileButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row justify-between items-center px-3 py-3">
      <Text style={styles.text}>{title}</Text>
      <MaterialIcons name="chevron-right" size={32} color={colors.navButtonBlue} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: colors.textBtmSheet,
    fontFamily: 'Shift-Type-Basic',
  },
});

export default EditProfileButton;
