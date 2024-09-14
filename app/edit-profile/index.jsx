import React from 'react';
import {
  Alert,
  Platform,
  BackHandler,
  SafeAreaView,
  ScrollView,
  Vibration,
  View,
} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import EditProfileButton from '../../components/EditProfileButton';
import { router } from 'expo-router';
import LightBlueButton from '../../components/LightBlueButton';
import { profileItems } from '../../constants/String';

export default function EditProfile() {
  const showAlert = () => {
    Alert.alert(
      'Are you sure?',
      "Press 'OK' to log out.",
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            if (Platform.OS === 'android') {
              BackHandler.exitApp();
            }
          },
        },
      ],
      { cancelable: false },
    );
  };
  return (
    <SafeAreaView className="flex-1 px-2 pt-1 bg-white">
      {/* Header Component */}
      <HeaderComponent title="Edit Profile" />

      {/* Profile Item List */}
      <ScrollView className="mt-3 mx-2">
        {profileItems.map((item, index) => (
          <EditProfileButton
            key={index}
            title={item.title}
            onPress={() => {
              Vibration.vibrate(50);
              if (item.enabled === true) {
                router.push(`/edit-profile/${item.field}`);
              }
            }}
          />
        ))}

        {/* Logout Button */}
        <View className="items-center mt-7 mx-2">
          <LightBlueButton
            title="Log Out"
            onPress={() => {
              Vibration.vibrate(50);
              showAlert();
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
