import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/Colors';

const HeaderComponent = ({
  title,
  handleThirdButton,
  showThirdButton = false,
}) => {
  const router = useRouter();

  return (
    <View
      style={styles.border}
      className="flex-row items-center justify-between"
    >
      <TouchableOpacity
        onPress={() => {
          Vibration.vibrate(50);
          router.back();
        }}
      >
        <MaterialIcons
          name="chevron-left"
          size={30}
          color={colors.navButtonBlue}
        />
      </TouchableOpacity>

      <Text style={styles.text}>{title}</Text>

      {showThirdButton ? (
        <TouchableOpacity
          onPress={() => {
            Vibration.vibrate(50);
            if (handleThirdButton) {
              handleThirdButton();
            }
          }}
        >
          <MaterialIcons
            name="refresh"
            size={30}
            color={colors.navButtonBlue}
          />
        </TouchableOpacity>
      ) : (
        <View className="p-4" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: colors.lightBlue,
  },
  text: {
    fontFamily: 'Shift-Type-Basic',
    fontSize: 24,
    color: colors.blue,
  },
});

export default HeaderComponent;
