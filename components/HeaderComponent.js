import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/Colors';

const HeaderComponent = ({ title }) => {
  const router = useRouter();

  return (
    <View style={styles.border} className="flex-row items-center space-x-4">
      <TouchableOpacity onPress={() => {
        Vibration.vibrate(50);
        router.back();
      }} className="mr-4">
        <MaterialIcons name="chevron-left" size={30} color={colors.navButtonBlue} />
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: colors.lightBlue,
  },
  text: {
    fontFamily: 'Shift-Type-Basic',
    fontSize: 24,
    color: colors.blue,
  },
});

export default HeaderComponent;
