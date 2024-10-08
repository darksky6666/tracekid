import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  Button,
  Linking,
  StyleSheet,
} from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import MapComponent from '../../components/MapComponent';
import MapFloatingButton from '../../components/MapFloatingButton';
import BottomSheetContent from '../../components/BottomSheetContent';
import AnimatedIcon from '../../components/AnimatedIcon';
import {
  checkLocationServices,
  handleOpenLocationSettings,
  getBounds,
  getIntervalId,
} from '../../utils/LocationUtils';
import { colors } from '../../constants/Colors';
import useRouteStore from '../../store/routeStore';

const MapScreen = () => {
  MapLibreGL.setAccessToken(null);
  MapLibreGL.setConnected(true);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [locationEnabled, setLocationEnabled] = useState(false);

  const { routeEnabled, setRouteEnabled } = useRouteStore();

  const destination = useMemo(
    () => ({
      latitude: 1.5329437312323446,
      longitude: 103.67787835942418,
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
    checkLocationServices(setLocation, setLocationEnabled, setErrorMsg);
  }, []);

  useEffect(() => {
    const intervalId = getIntervalId(
      setLocationEnabled,
      setErrorMsg,
      setLocation
    );

    return () => clearInterval(intervalId);
  }, []);

  if (!locationEnabled || !location) {
    return (
      <SafeAreaView className="flex-1 flex-col justify-center items-center space-y-6 bg-white">
        <AnimatedIcon />
        <Text style={styles.errorMsg} className="font-bold text-lg">
          {errorMsg || 'Loading location...'}
        </Text>
        {errorMsg && (
          <View className="w-2/3 pt-5">
            <Button
              color={colors.darkPink}
              title="Enable Location Services"
              onPress={handleOpenLocationSettings}
            />
          </View>
        )}
        {errorMsg && (
          <View className="w-2/3">
            <Button
              color={colors.darkPink}
              title="Open App Settings"
              onPress={() => Linking.openSettings()}
            />
          </View>
        )}
      </SafeAreaView>
    );
  }

  const bounds = getBounds(routeCoordinates, destination, location);

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="flex flex-col h-full w-full">
        <MapComponent
          routeCoordinates={routeCoordinates}
          destination={destination}
          routeEnabled={routeEnabled}
          bounds={bounds}
        />
        <MapFloatingButton />
        <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
          <BottomSheetContent setRouteEnabled={setRouteEnabled} />
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  errorMsg: {
    color: colors.textBtmSheet,
  },
});

export default MapScreen;
