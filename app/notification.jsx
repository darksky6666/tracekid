import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableHighlight,
  Vibration,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import HeaderComponent from '../components/HeaderComponent';
import { colors } from '../constants/Colors';

export default function Notification() {
  const currentDate = moment().format('DD-MM-YYYY');

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white px-2">
        <HeaderComponent title="Notification" />
        <View className="flex-1 mt-6 mx-2">
          <TouchableHighlight
            className="rounded-3xl"
            underlayColor="white"
            onPress={() => {
              Vibration.vibrate(50);
            }}
          >
            <View
              style={styles.container}
              className="rounded-3xl flex-row py-4 px-7 items-center "
            >
              <View className="mr-6">
                <FontAwesome
                  name="bell-o"
                  size={30}
                  color={colors.deviceMenuIconPink}
                />
              </View>
              <View className="flex-1 space-y-3">
                <View className="mb-2">
                  <Text style={styles.text}>Promotion!!!</Text>
                </View>
                <View className="items-end">
                  <Text style={styles.date}>{currentDate}</Text>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightBlue,
  },
  text: {
    color: colors.textBtmSheet,
    fontFamily: 'Cooper-Black',
    fontSize: 20,
  },
  date: {
    color: colors.textBtmSheet,
    fontFamily: 'Shift-Type-Basic',
    fontSize: 14,
  },
});
