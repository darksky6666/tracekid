import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/Colors';

export default function DeviceMenuButton({ rows }) {
  return (
    <View className="flex-1 bg-white rounded-md overflow-hidden">
      {rows.map((row, index) => (
        <View key={index} className="flex flex-col gap-y-3">
          <TouchableHighlight
            onPress={row.onPress}
            className="rounded-2xl"
            underlayColor={colors.lightBlue}
          >
            <View className="flex flex-row items-center py-4">
              <View className="flex-1 items-center justify-center">
                <MaterialIcons
                  name={row.iconName}
                  size={50}
                  color={colors.deviceMenuIconPink}
                />
              </View>
              <View className="flex-[3_3_0%] justify-center">
                <Text className="ml-3" style={styles.text}>
                  {row.text}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
          {index < rows.length - 1 && <View style={styles.line} />}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Shift-Type-Basic',
    fontSize: 30,
    color: colors.blue,
  },
  line: {
    backgroundColor: colors.lightBlueMenu,
    height: 2,
    width: '100%',
    marginBottom: 10,
  },
});
