import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from '../constants/Colors';

const MenuItem = ({ text, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex flex-row justify-between items-center p-4"
    >
      <Text style={styles.text} className="text-lg">{text}</Text>
      <MaterialIcons name="chevron-right" size={28} color={colors.darkPink} />
    </Pressable>
  );
};

const Separator = () => {
  return <View className="h-px bg-blue-500" />;
};

const MenuList = ({ items }) => {
  return (
    <View className="mt-4 border border-gray-300 bg-white rounded-lg overflow-hidden pl-2 pr-2">
      {items.map((item, index) => (
        <View key={index}>
          <MenuItem text={item.text} onPress={item.onPress} />
          {index < items.length - 1 && <Separator />}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Shift-Type-Basic',
    color: colors.textBtmSheet,
    fontWeight: 500,
  },
});

export default MenuList;
