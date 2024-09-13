import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableHighlight,
  Vibration,
  BackHandler,
  Platform,
  Alert,
} from 'react-native';
import { colors } from '../../constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ProfileButton from '../../components/ProfileButton';
import { router } from 'expo-router';

export default function Profile() {
  const showAlert = () => {
    Alert.alert(
      'Are you sure?',
      "Press 'OK' to close the application",
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
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.border, styles.row]}>
        <View style={styles.iconContainer}>
          <FontAwesome name="user-circle" size={75} color={colors.lightBlueBtmSheet} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>Jessy Lim</Text>
          <TouchableHighlight
            style={styles.buttonWrapper}
            underlayColor={colors.lightBlue}
            onPress={() => {
              Vibration.vibrate(50);
            }}
          >
            <View style={styles.button}>
              <Text style={styles.textBtn}>Edit Profile</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>

      {/* Bottom layer */}
      <View className="flex-[4_4_0%] flex-col p-5">
        <ProfileButton
          onPress={() => {
            Vibration.vibrate(50);
            router.push('/helpchat');
          }}
          icon="help-outline"
          text="Help and Feedback"
        />
        <ProfileButton
          onPress={() => {
            Vibration.vibrate(50);
            showAlert();
          }}
          icon="power-settings-new"
          text="Shut Down"
        />
        <ProfileButton
          onPress={() => Vibration.vibrate(50)}
          icon="info-outline"
          text="About Us"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
  },
  border: {
    borderBottomWidth: 4,
    borderColor: colors.lightBlue,
    paddingTop: 16,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  infoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  name: {
    fontFamily: 'Shift-Type-Basic',
    color: colors.textBtmSheet,
    fontSize: 25,
    fontWeight: '600',
  },
  buttonWrapper: {
    marginTop: 8,
    borderRadius: 24,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    fontFamily: 'Shift-Type-Basic',
    fontSize: 14,
    color: colors.navButtonBlue,
  },
  text: {
    fontFamily: 'Shift-Type-Basic',
    color: colors.textBtmSheet,
  },
});
