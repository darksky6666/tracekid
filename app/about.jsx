import React from 'react';
import {
  SafeAreaView,
  Image,
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import { ScrollView } from 'react-native';
import { versionInfo } from '../constants/String';
import { colors } from '../constants/Colors';
import AboutButton from '../components/AboutButton';
import { clearAppData } from '../utils/ClearAppDataUtils';
import useRouteStore from '../store/routeStore';

export default function AboutUs() {
  const { resetRouteEnabled } = useRouteStore();

  const showAlert = () => {
    Alert.alert(
      'Are you sure?',
      "Press 'CLEAR' to clear the cache.\nThis action is irreversible!",
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'CLEAR',
          onPress: () => {
            clearAppData(resetRouteEnabled);
          },
        },
      ],
      { cancelable: false },
    );
  };
  return (
    <SafeAreaView className="flex-1">
      {/* Header Component */}
      <HeaderComponent title="About Us" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* App Icon Display and Version */}
        <View className="flex-1 flex-col justify-center items-center space-y-4">
          <Image
            className="h-1/2"
            resizeMode="contain"
            source={require('../assets/images/icon.png')}
          />
          <Text style={styles.versionText}>{versionInfo}</Text>
        </View>
        {/* Button */}
        <View className="flex-1 flex-col justify-start items-center">
          <AboutButton
            title="Clear Cache"
            onPress={() => {
              showAlert();
            }}
          />
          <AboutButton
            title="Update"
            onPress={() => {
              Alert.alert(
                'Update',
                'You already have the latest version.',
                [
                  {
                    text: 'OK',
                  },
                ],
                { cancelable: false },
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  versionText: {
    fontFamily: 'Shift-Type-Basic',
    fontSize: 20,
    color: colors.textBtmSheet,
  },
  button: {
    backgroundColor: colors.lightBlue,
  },
  buttonText: {
    fontFamily: 'Shift-Type-Basic',
    fontSize: 22,
    color: colors.textBtmSheet,
  },
});
