import React from 'react';
import {
	TouchableHighlight,
	Text,
	View,
	Vibration,
	StyleSheet,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { colors } from '../constants/Colors';

const BottomSheetContent = ({ setRouteEnabled }) => (
	<View className="flex-1 flex-col p-4 space-y-10">
		{/* Title */}
		<View>
			<Text className="font-semibold text-3xl" style={styles.title}>
				My Device
			</Text>
		</View>
		{/* Buttons */}
		<View className="flex-1 flex-col space-y-5">
			<TouchableHighlight
				className="p-4 rounded-lg"
				style={styles.btn1}
				underlayColor={colors.lightPink}
				onPress={() => {
					setRouteEnabled(true);
					Vibration.vibrate(50);
				}}
			>
				<View className="flex flex-row space-x-5 items-center justify-center">
					<View className="flex-1 items-end">
						<FontAwesome name="heart" size={40} color="white" />
					</View>
					<View className="flex-[2_2_0%] flex-col">
						<View>
							<Text className="font-semibold text-xl" style={styles.textBtn}>
								Jordon
							</Text>
						</View>
						<View>
							<Text className="font-semibold" style={styles.descBtn1}>
								Not Connected
							</Text>
						</View>
					</View>
				</View>
			</TouchableHighlight>
			<TouchableHighlight
				className="p-4 rounded-3xl"
				style={styles.btn2}
				underlayColor={colors.lightBlueBtmSheet}
				onPress={() => {
					setRouteEnabled(false);
					Vibration.vibrate(50);
				}}
			>
				<View className="flex flex-row space-x-5 items-center justify-center">
					<View className="flex-1 items-end">
						<Entypo name="plus" size={24} color={colors.darkPink} />
					</View>
					<View className="flex-[2_2_0%]">
						<Text className="font-semibold text-xl" style={styles.textBtn}>
							Add Device
						</Text>
					</View>
				</View>
			</TouchableHighlight>
		</View>
	</View>
);

const styles = StyleSheet.create({
	title: {
		fontFamily: 'Shift-Type-Basic',
	},
	btn1: {
		backgroundColor: colors.darkPink,
	},
	textBtn: {
		color: colors.textBtmSheet,
		fontFamily: 'Shift-Type-Basic',
	},
	descBtn1: {
		color: 'white',
		fontFamily: 'Shift-Type-Basic',
	},
	btn2: {
		backgroundColor: colors.lightBlue,
	},
});

export default BottomSheetContent;
