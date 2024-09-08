import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MapLibreGL from "@maplibre/maplibre-react-native";
import * as Location from "expo-location";

const Main = () => {
	MapLibreGL.setAccessToken(null);
	MapLibreGL.setConnected(true);
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [routeCoordinates, setRouteCoordinates] = useState([]);

	const destination = {
        latitude: 1.5040114001528468,
        longitude: 103.38603342889529,
    };

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let { coords } = await Location.getCurrentPositionAsync({});
			setLocation(coords);

			fetchRoute(coords, destination);
		})();
	}, []);

	const fetchRoute = async (start, end) => {
        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62487d40fd68518f4e30828030b10f58a51d&start=${start.longitude},${start.latitude}&end=${end.longitude},${end.latitude}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.features && data.features.length > 0) {
            const coordinates = data.features[0].geometry.coordinates.map(
                coord => ({ latitude: coord[1], longitude: coord[0] })
            );
            setRouteCoordinates(coordinates);
        }
    };

	if (!location) {
		return (
			<SafeAreaView className="flex-1 justify-center items-center">
				<MaterialIcons name="location-off" size={24} color="black" />
				<Text>{errorMsg || "Loading location..."}</Text>
			</SafeAreaView>
		);
	}

	const getBounds = (coordinates) => {
        let minLat, maxLat, minLng, maxLng;

        coordinates.forEach(coord => {
            minLat = minLat !== undefined ? Math.min(minLat, coord.latitude) : coord.latitude;
            maxLat = maxLat !== undefined ? Math.max(maxLat, coord.latitude) : coord.latitude;
            minLng = minLng !== undefined ? Math.min(minLng, coord.longitude) : coord.longitude;
            maxLng = maxLng !== undefined ? Math.max(maxLng, coord.longitude) : coord.longitude;
        });

        return {
            ne: [maxLng || destination.longitude, maxLat || destination.latitude],
            sw: [minLng || location.longitude, minLat || location.latitude],
        };
    };

	const bounds = getBounds(routeCoordinates);

	return (
		<SafeAreaView className="flex-1 flex-col">
			{/* Maps */}
			<View className="flex-1">
				<MapLibreGL.MapView
					style={{ height: "50%", width: "100%"}}
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
					{/* <MapLibreGL.Camera
						zoomLevel={18}
						followUserLocation={true}
						followUserMode="compass"
					/> */}
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
							//followUserLocation={true}
							//followUserMode="compass"
                            animationDuration={1000}
                        />
                    )}
					{/* Render the navigation line */}
                    {routeCoordinates.length > 0 && (
                        <MapLibreGL.ShapeSource
                            id="routeSource"
                            shape={{
                                type: "LineString",
                                coordinates: routeCoordinates.map(coord => [
                                    coord.longitude,
                                    coord.latitude,
                                ]),
                            }}
                        >
                            <MapLibreGL.LineLayer
                                id="routeLayer"
                                style={{
                                    lineColor: "#FF0000",
                                    lineWidth: 5,
                                }}
                            />
                        </MapLibreGL.ShapeSource>
                    )}
				</MapLibreGL.MapView>
			</View>
			{/* Floating Button */}
			<View className="absolute top-0 left-0 right-0 flex-row justify-between p-4">
				<MaterialIcons name="menu" size={24} color="#B6E1F3" />
				<MaterialIcons name="headphones" size={24} color="#F193B9" />
			</View>
		</SafeAreaView>
	);
};

export default Main;
