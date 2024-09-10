import React from 'react';
import { router, Tabs } from 'expo-router';
import TabBarIcon from '../../components/TabBarIcon';
import { colors } from '../../constants/Colors';
import { Vibration } from 'react-native';

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarInactiveTintColor: colors.lightPink,
				tabBarActiveTintColor: colors.superDarkPink,
				headerShown: false,
				tabBarShowLabel: false,
			}}
			initialRouteName="map"
		>
			<Tabs.Screen
				name="map"
				options={{
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="shopping-basket" color={color} />
					),
				}}
				listeners={() => ({
					tabPress: (e) => {
						Vibration.vibrate(50);
					},
				})}
			/>
			<Tabs.Screen
				name="notification"
				options={{
					tabBarIcon: ({ color }) => <TabBarIcon name="bell-o" color={color} />,
				}}
				listeners={() => ({
					tabPress: (e) => {
						Vibration.vibrate(50);
					},
				})}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					tabBarIcon: ({ color }) => <TabBarIcon name="user-o" color={color} />,
				}}
				listeners={() => ({
					tabPress: (e) => {
						Vibration.vibrate(50);
					},
				})}
			/>
		</Tabs>
	);
}
