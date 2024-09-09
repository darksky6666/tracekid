import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Image } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);

	useEffect(() => {
		async function prepare() {
			console.log(
				"I'm a task that gets executed before splash screen disappears"
			);
			setAppIsReady(true);
		}
		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await new Promise((resolve) => setTimeout(resolve, 5000));
			console.log("Now it's ready");
			await SplashScreen.hideAsync();
			router.replace('/map');
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	return (
		<View onLayout={onLayoutRootView} className="flex-1">
			<Image
				className="flex-1 w-screen h-screen justify-center"
				source={require('../assets/images/splash.png')}
				resizeMode="cover"
			/>
		</View>
	);
}
