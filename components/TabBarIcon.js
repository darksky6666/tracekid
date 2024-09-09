import React from 'react';
import { Dimensions } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const { height } = Dimensions.get('window');

const TabBarIcon = ({ name, color }) => {
	const vh = height * 0.03;

	return <FontAwesome size={vh} name={name} color={color} />;
};

export default TabBarIcon;
