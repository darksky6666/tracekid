import React, { useEffect, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import { colors } from '../../constants/Colors';
import { fieldLabelMap, userId } from '../../constants/String';
import LightBlueButton from '../../components/LightBlueButton';
import { getUserById, updateUserName } from '../../services/database';

export default function EditProfileField() {
  const { field } = useLocalSearchParams();
  const router = useRouter();
  const [currentValue, setCurrentValue] = useState('');
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = await getUserById(userId);
        if (user) {
          setCurrentValue(user.name);
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };
    if (field === 'name') {
      fetchUserName();
    }
  }, [field]);

  const handleSave = async () => {
    if (field === 'name') {
      try {
        await updateUserName(userId, newValue || currentValue);
        Alert.alert('Updated Successfully!');
        router.back();
      } catch (error) {
        console.error('Error updating user name:', error);
      }
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-2 pt-1">
      {/* Header Component */}
      <HeaderComponent title={`Edit ${fieldLabelMap[field] || 'Field'}`} />

      <View className="flex-1 p-4">
        {/* Current Data Display */}
        <View className="my-2">
          <Text style={styles.font} className="text-xl">
            Current {fieldLabelMap[field]}:
          </Text>
          <Text style={styles.font} className="text-xl">
            {currentValue || 'Loading...'}
          </Text>
        </View>

        {/* New Data Input */}
        <View className="my-3 space-y-3">
          <Text style={styles.font} className="text-xl">
            New {fieldLabelMap[field]}:
          </Text>
          <TextInput
            style={styles.input}
            className="text-xl"
            value={newValue}
            onChangeText={setNewValue}
            placeholder={`Enter new ${fieldLabelMap[field]}`}
            secureTextEntry={field === 'password'} // Hide text for password field
          />
        </View>

        {/* Save Button */}
        <View className="mt-7">
          <LightBlueButton title="Save" onPress={handleSave} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Shift-Type-Basic',
    color: colors.textBtmSheet,
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: 'black',
    fontFamily: 'Shift-Type-Basic',
    fontSize: 18,
    backgroundColor: colors.lightBlue,
  },
});
