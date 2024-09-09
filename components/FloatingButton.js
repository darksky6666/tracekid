import React from 'react';
import { TouchableHighlight, Alert, Vibration, View, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from '../constants/Colors';

const FloatingButton = () => (
	<View className="absolute top-0 left-0 right-0 flex-row justify-between p-4">
		<TouchableHighlight
			className="flex bg-white border-blue-300/50 border-2 w-11 h-11 rounded-md justify-center items-center"
			underlayColor={colors.lightBlue}
			onPress={() => {
				Alert.alert('Button Pressed', 'You pressed the button!');
				Vibration.vibrate(50);
			}}
		>
			<MaterialIcons name="menu" size={36} color={colors.lightBlueMenu} />
		</TouchableHighlight>
		<TouchableHighlight
			className="flex w-12 h-12 rounded-full justify-center items-center"
			style={styles.headphoneBtn}
			underlayColor={colors.lightPink}
			onPress={() => {
				Alert.alert('Button Pressed', 'You pressed the button!');
				Vibration.vibrate(50);
			}}
		>
			<MaterialIcons name="headphones" size={32} color="white" />
		</TouchableHighlight>
	</View>
);

const styles = StyleSheet.create({
	headphoneBtn: {
		backgroundColor: colors.darkPink,
	},
});

export default FloatingButton;