import React from 'react';
import {
  View,
  TouchableOpacity,
  Vibration,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Text,
  ScrollView,
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors } from '../constants/Colors';
import MenuList from '../components/MenuButton';
import { useSound } from '../hooks/useSound';

export default function Setting() {
  const { playSound } = useSound(require('../assets/audio/ring.mp3'));

  const menuSection1 = [
    { text: 'Fit Test', onPress: () => Vibration.vibrate(50) },
    { text: 'Connection', onPress: () => Vibration.vibrate(50) },
  ];

  const menuSection2 = [
    {
      text: 'Notification',
      onPress: () => {
        Vibration.vibrate(50);
        router.push('/notification');
      },
    },
    {
      text: 'Ring',
      onPress: () => {
        Vibration.vibrate(50);
        playSound();
      },
    },
  ];

  const menuSection3 = [
    { text: 'About', onPress: () => Vibration.vibrate(50) },
    { text: 'System & Update', onPress: () => Vibration.vibrate(50) },
    { text: 'User Manual', onPress: () => Vibration.vibrate(50) },
  ];

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        className="flex-1"
        source={require('../assets/bg/setting.png')}
        resizeMode="cover"
      >
        {/* Content */}
        <ScrollView className="flex-1 p-3">
          {/* Floating Button */}
          <View className="flex flex-row items-center justify-between p-3">
            <TouchableOpacity
              onPress={() => {
                Vibration.vibrate(50);
                router.back();
              }}
            >
              <FontAwesome
                name="chevron-left"
                size={24}
                color={colors.navButtonBlue}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Vibration.vibrate(50);
              }}
            >
              <MaterialIcons
                name="headphones"
                size={30}
                color={colors.darkPink}
              />
            </TouchableOpacity>
          </View>

          {/* Setting text */}
          <View className="pl-3">
            <Text style={styles.title} className="text-3xl font-semibold">
              Setting
            </Text>
          </View>
          {/* Row inside border */}
          <View className="flex-1 p-3">
            <MenuList items={menuSection1} />
            <MenuList items={menuSection2} />
            <MenuList items={menuSection3} />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Shift-Type-Basic',
    color: colors.textBtmSheet,
  },
});
