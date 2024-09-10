import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { colors } from '../constants/Colors';

const AnimatedIcon = () => {
	const animatedValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(animatedValue, {
					toValue: 1,
					duration: 500,
					easing: Easing.inOut(Easing.ease),
					useNativeDriver: true,
				}),
				Animated.timing(animatedValue, {
					toValue: -1,
					duration: 500,
					easing: Easing.inOut(Easing.ease),
					useNativeDriver: true,
				}),
				Animated.timing(animatedValue, {
					toValue: 0,
					duration: 500,
					easing: Easing.inOut(Easing.ease),
					useNativeDriver: true,
				}),
			])
		).start();
	}, [animatedValue]);

	const translateX = animatedValue.interpolate({
		inputRange: [-1, 0, 1],
		outputRange: [-10, 0, 10],
	});

	const translateY = animatedValue.interpolate({
		inputRange: [-1, 0, 1],
		outputRange: [10, 0, -10],
	});

	return (
		<Animated.View style={{ transform: [{ translateX }, { translateY }] }}>
			<FontAwesome5 name="search-location" size={60} color={colors.textBtmSheet} />
		</Animated.View>
	);
};

export default AnimatedIcon;
