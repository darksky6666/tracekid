import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from '../constants/Colors';

const ProfileButton = ({ onPress, icon, text }) => {
  return (
    <Pressable
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
      className="flex flex-row items-center pt-4 pb-4"
    >
      <View className="flex flex-row items-center gap-x-3">
        <MaterialIcons name={icon} size={38} color="pink" />
        <View>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Shift-Type-Basic',
    color: colors.textBtmSheet,
    fontSize: 20,
  },
});

export default ProfileButton;
