import React, { useState, useEffect, useRef } from 'react';
import {
	TouchableHighlight,
	SafeAreaView,
	Text,
	View,
	Alert,
	Dimensions,
	Vibration,
	Linking,
	Platform,
	Button,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import MapLibreGL from '@maplibre/maplibre-react-native';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useMemo } from 'react';

const MapScreen = () => {
	MapLibreGL.setAccessToken(null);
	MapLibreGL.setConnected(true);
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [routeCoordinates, setRouteCoordinates] = useState([]);
	const [locationEnabled, setLocationEnabled] = useState(false);
	const [routeEnabled, setRouteEnabled] = useState(false);

	const destination = useMemo(
		() => ({
			latitude: 1.5040114001528468,
			longitude: 103.38603342889529,
		}),
		[]
	);

	const bottomSheetRef = useRef(null);
	const screenHeight = Dimensions.get('window').height;
	const snapPoints = [screenHeight * 0.11, screenHeight * 0.38];

	useEffect(() => {
		const fetchRoute = async () => {
			let start = location;
			let end = destination;

			const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62487d40fd68518f4e30828030b10f58a51d&start=${start.longitude},${start.latitude}&end=${end.longitude},${end.latitude}`;
			const response = await fetch(url);
			const data = await response.json();

			if (data && data.features && data.features.length > 0) {
				const coordinates = data.features[0].geometry.coordinates.map(
					(coord) => ({ latitude: coord[1], longitude: coord[0] })
				);
				setRouteCoordinates(coordinates);
			}
		};
		if (location && routeEnabled) {
			fetchRoute();
		}
	}, [destination, location, routeEnabled]);

	useEffect(() => {
		checkLocationServices();
	}, []);

	const checkLocationServices = async () => {
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

	const handleOpenLocationSettings = () => {
		if (Platform.OS === 'ios') {
			Linking.openURL('App-Prefs:root=Privacy&path=LOCATION');
		} else {
			Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
		}
	};

	if (!locationEnabled || !location) {
		return (
			<SafeAreaView className="flex-1 flex-col justify-center items-center space-y-6">
				<MaterialIcons name="location-off" size={24} color="black" />
				<View>
					<Text>{errorMsg || 'Loading location...'}</Text>
				</View>

				{errorMsg && (
					<View className="w-2/3">
						<Button
							title="Enable Location Services"
							onPress={handleOpenLocationSettings}
						/>
					</View>
				)}

				{errorMsg && (
					<View className="w-2/3">
						<Button
							title="Open App Settings"
							onPress={() => {
								Linking.openSettings();
							}}
						/>
					</View>
				)}
			</SafeAreaView>
		);
	}

	const getBounds = (coordinates) => {
		let minLat, maxLat, minLng, maxLng;

		coordinates.forEach((coord) => {
			minLat =
				minLat !== undefined
					? Math.min(minLat, coord.latitude)
					: coord.latitude;
			maxLat =
				maxLat !== undefined
					? Math.max(maxLat, coord.latitude)
					: coord.latitude;
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

	const bounds = getBounds(routeCoordinates);

	return (
		<GestureHandlerRootView>
			<SafeAreaView className="flex flex-col h-full w-full">
				{/* Maps */}
				<View className="flex-1">
					<MapLibreGL.MapView
						style={{ height: '100%', width: '100%' }}
						styleURL="https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json"
						logoEnabled={false}
						attributionEnabled={false}
						compassEnabled={false}
						zoomEnabled={true}
						scrollEnabled={true}
						pitchEnabled={true}
						rotateEnabled={true}
					>
						<MapLibreGL.UserLocation visible={true} />
						{routeEnabled ? (
							<>
								{bounds && (
									<MapLibreGL.Camera
										bounds={{
											ne: bounds.ne,
											sw: bounds.sw,
											paddingBottom: 10,
											paddingLeft: 10,
											paddingRight: 10,
											paddingTop: 10,
										}}
										animationDuration={1000}
									/>
								)}
								{/* Render the navigation line */}
								{routeCoordinates.length > 0 && (
									<MapLibreGL.ShapeSource
										id="routeSource"
										shape={{
											type: 'LineString',
											coordinates: routeCoordinates.map((coord) => [
												coord.longitude,
												coord.latitude,
											]),
										}}
									>
										<MapLibreGL.LineLayer
											id="routeLayer"
											style={{
												lineColor: '#FF0000',
												lineWidth: 5,
											}}
										/>
									</MapLibreGL.ShapeSource>
								)}
								<MapLibreGL.PointAnnotation
									id="destination"
									coordinate={[destination.longitude, destination.latitude]}
								>
									<View className="flex-1 bg-blue-300/60 w-7 h-7 rounded-full justify-center items-center">
										<View className="flex bg-white w-5 h-5 rounded-full justify-center items-center">
											<View className="flex bg-red-500 w-3 h-3 rounded-full" />
										</View>
									</View>
								</MapLibreGL.PointAnnotation>
							</>
						) : (
							<>
								<MapLibreGL.Camera
									followUserLocation={true}
									followUserMode="compass"
									zoomLevel={18}
									animationDuration={1000}
								/>
							</>
						)}
					</MapLibreGL.MapView>
				</View>
				{/* Floating Button */}
				<View className="absolute top-0 left-0 right-0 flex-row justify-between p-4">
					<TouchableHighlight
						className="flex bg-white border-blue-300/50 border-2 w-11 h-11 rounded-md justify-center items-center"
						underlayColor="#E4F3F9"
						onPress={() => {
							Alert.alert('Button Pressed', 'You pressed the button!');
							Vibration.vibrate(50);
						}}
					>
						<MaterialIcons name="menu" size={36} color="#B6E1F3" />
					</TouchableHighlight>
					<TouchableHighlight
						className="flex w-12 h-12 rounded-full justify-center items-center"
						style={{ backgroundColor: '#F193B9' }}
						underlayColor="#F7A1C3"
						onPress={() => {
							Alert.alert('Button Pressed', 'You pressed the button!');
							Vibration.vibrate(50);
						}}
					>
						<MaterialIcons name="headphones" size={32} color="white" />
					</TouchableHighlight>
				</View>
				{/* Bottom Sheet */}
				<BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
					<View className="flex-1 flex-col p-4 space-y-10">
						{/* Title */}
						<View>
							<Text
								className="font-semibold text-3xl"
								style={{ fontFamily: 'Shift-Type-Basic' }}
							>
								My Device
							</Text>
						</View>
						{/* Buttons */}
						<View className="flex-1 flex-col space-y-5">
							<TouchableHighlight
								className="p-4 rounded-lg"
								style={{ backgroundColor: '#F193B9' }}
								underlayColor="#F7A1C3"
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
											<Text
												className="font-semibold text-xl"
												style={{
													color: '#30558C',
													fontFamily: 'Shift-Type-Basic',
												}}
											>
												Jordon
											</Text>
										</View>
										<View>
											<Text
												className="font-semibold"
												style={{
													color: 'white',
													fontFamily: 'Shift-Type-Basic',
												}}
											>
												Connected
											</Text>
										</View>
									</View>
								</View>
							</TouchableHighlight>
							<TouchableHighlight
								className="p-4 rounded-3xl"
								style={{ backgroundColor: '#E4F3F9' }}
								underlayColor="#B9E7fA"
								onPress={() => {
									setRouteEnabled(false);
									Vibration.vibrate(50);
								}}
							>
								<View className="flex flex-row space-x-5 items-center justify-center">
									<View className="flex-1 items-end">
										<Entypo name="plus" size={24} color="#F193B9" />
									</View>
									<View className="flex-[2_2_0%]">
										<Text
											className="font-semibold text-xl"
											style={{
												color: '#30558C',
												fontFamily: 'Shift-Type-Basic',
											}}
										>
											Add Device
										</Text>
									</View>
								</View>
							</TouchableHighlight>
						</View>
					</View>
				</BottomSheet>
			</SafeAreaView>
		</GestureHandlerRootView>
	);
};

export default MapScreen;
