import React from 'react';
import MapLibreGL from '@maplibre/maplibre-react-native';
import { StyleSheet, View } from 'react-native';

const MapComponent = ({
	routeCoordinates,
	destination,
	routeEnabled,
	bounds,
}) => (
	<View className="flex-1">
		<MapLibreGL.MapView
			style={styles.mapView}
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
							<MapLibreGL.LineLayer id="routeLayer" style={styles.routeLine} />
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
				<MapLibreGL.Camera
					followUserLocation={true}
					followUserMode="compass"
					zoomLevel={18}
					animationDuration={1000}
				/>
			)}
		</MapLibreGL.MapView>
	</View>
);

const styles = StyleSheet.create({
	mapView: {
		height: '100%',
		width: '100%',
	},
	routeLine: {
		lineColor: 'red',
		lineWidth: 5,
	},
});

export default MapComponent;
