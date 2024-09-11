import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as Battery from 'expo-battery';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../constants/Colors';

export default function BatteryLevel() {
  const [batteryLevel, setBatteryLevel] = useState(null);

  const loadBatteryLevel = async () => {
    const level = await Battery.getBatteryLevelAsync();
    setBatteryLevel(level);
  };

  useEffect(() => {
    loadBatteryLevel();

    const batterySubscription = Battery.addBatteryLevelListener(
      ({ batteryListener }) => {
        setBatteryLevel(batteryListener);
      },
    );

    return () => {
      batterySubscription.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadBatteryLevel();
    }, []),
  );

  if (batteryLevel === null) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="blue" />
        <Text className="mt-4 text-lg">Loading battery level...</Text>
      </View>
    );
  }

  const batteryPercentage = Math.round(batteryLevel * 100);
  let batteryIcon = '';

  if (batteryPercentage >= 80) {
    batteryIcon = 'battery-full';
  } else if (batteryPercentage >= 60) {
    batteryIcon = 'battery-three-quarters';
  } else if (batteryPercentage >= 40) {
    batteryIcon = 'battery-half';
  } else if (batteryPercentage >= 20) {
    batteryIcon = 'battery-quarter';
  } else {
    batteryIcon = 'battery-empty';
  }

  return (
    <View className="items-center">
      <FontAwesome name={batteryIcon} size={60} color={colors.lightBlueMenu} />
    </View>
  );
}
