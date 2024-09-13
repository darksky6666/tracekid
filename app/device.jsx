import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Vibration,
  ScrollView,
  Linking,
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { colors } from '../constants/Colors';
import BatteryIcon from '../components/BatteryIcon';
import { deviceName, phoneNumber } from '../constants/String';
import DeviceMenuButton from '../components/DeviceMenuButton';
import { router } from 'expo-router';
import useRouteStore from '../store/routeStore';

export default function DeviceInfo() {
  const { setRouteEnabled, resetRouteEnabled } = useRouteStore();

  const rows = [
    {
      iconName: 'touch-app',
      text: 'Check Location',
      onPress: () => {
        Vibration.vibrate(50);
        setRouteEnabled(true);
        router.back();
      },
    },
    {
      iconName: 'report',
      text: 'Report',
      onPress: async () => {
        Vibration.vibrate(50);
        await Linking.openURL(phoneNumber);
      },
    },
    {
      iconName: 'hearing',
      text: 'Hear',
      onPress: () => {
        Vibration.vibrate(50);
      },
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <ScrollView className="flex-1">
        {/* Option buttons */}
        <View className="flex flex-row items-center justify-end gap-x-4">
          {/* Help button */}
          <Pressable
            onPress={() => {
              Vibration.vibrate(50);
            }}
          >
            <MaterialIcons
              name="help-outline"
              size={30}
              color={colors.lightBlueMenu}
            />
          </Pressable>
          {/* Setting button */}
          <Pressable
            onPress={() => {
              Vibration.vibrate(50);
              resetRouteEnabled();
              router.back();
            }}
          >
            <MaterialIcons
              name="settings"
              size={30}
              color={colors.lightBlueMenu}
            />
          </Pressable>
        </View>

        {/* Device Info */}
        <View className="mt-4 flex flex-col items-center justify-center space-y-2">
          <FontAwesome name="heart" size={60} color={colors.darkPink} />
          <Text style={styles.text}>{deviceName}</Text>
          <BatteryIcon />
        </View>

        {/* Menu Button */}
        <View className="flex-1 mt-6 p-4">
          <DeviceMenuButton rows={rows} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Shift-Type-Basic',
    fontSize: 48,
    color: colors.blue,
  },
});
