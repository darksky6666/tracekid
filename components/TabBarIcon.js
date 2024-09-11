import React from 'react';
import { Dimensions } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const { height } = Dimensions.get('window');

const TabBarIcon = ({ name, color }) => {
	let vh;
	if (name === 'home') {
		vh = height * 0.04;
	} else {
		vh = height * 0.03;
	}

	return <FontAwesome size={vh} name={name} color={color} />;
};

export default TabBarIcon;
