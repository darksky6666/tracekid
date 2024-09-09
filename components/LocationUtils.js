import * as Location from 'expo-location';
import { Linking, Platform } from 'react-native';

export const getBounds = (coordinates, destination, location) => {
	let minLat, maxLat, minLng, maxLng;

	coordinates.forEach((coord) => {
		minLat =
			minLat !== undefined ? Math.min(minLat, coord.latitude) : coord.latitude;
		maxLat =
			maxLat !== undefined ? Math.max(maxLat, coord.latitude) : coord.latitude;
		minLng =
			minLng !== undefined
				? Math.min(minLng, coord.longitude)
				: coord.longitude;
		maxLng =
			maxLng !== undefined
				? Math.max(maxLng, coord.longitude)
				: coord.longitude;
	});

	return {
		ne: [maxLng || destination.longitude, maxLat || destination.latitude],
		sw: [minLng || location.longitude, minLat || location.latitude],
	};
};

export const checkLocationServices = async (
	setLocation,
	setLocationEnabled,
	setErrorMsg
) => {
	let { status } = await Location.requestForegroundPermissionsAsync();
	if (status !== 'granted') {
		setErrorMsg('Permission to access location was denied');
		return;
	}

	const locationServicesEnabled = await Location.hasServicesEnabledAsync();
	setLocationEnabled(locationServicesEnabled);

	if (!locationServicesEnabled) {
		setErrorMsg('Location services are disabled.');
		return;
	}

	let { coords } = await Location.getCurrentPositionAsync({});
	setLocation(coords);
};

export const handleOpenLocationSettings = () => {
	if (Platform.OS === 'ios') {
		Linking.openURL('App-Prefs:root=Privacy&path=LOCATION');
	} else {
		Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
	}
};

export const getIntervalId = (setLocationEnabled, setErrorMsg, setLocation) => {
	const intervalId = setInterval(async () => {
		try {
			const locationServicesEnabled = await Location.hasServicesEnabledAsync();
			setLocationEnabled(locationServicesEnabled);

			if (locationServicesEnabled) {
				setErrorMsg(null);
				try {
					let { coords } = await Location.getCurrentPositionAsync({});
					setLocation(coords);
				} catch (error) {
					console.error(error);
					setErrorMsg('Unable to fetch location.');
				}
			} else {
				setLocation(null);
				setErrorMsg('Location services are disabled.');
			}
		} catch (error) {
			console.error(error);
			setErrorMsg('An unexpected error occurred.');
		}
	}, 5000);

	return intervalId;
};
