import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';
import RNRestart from 'react-native-restart';
import { dropTables } from '../services/database';


export const clearAppData = async (reset) => {
  const dbFilePath = `${FileSystem.documentDirectory}/SQLite/tracekid.db`;
  try {
    // Step 1: Clear cache files (FileSystem)
    const cacheDir = FileSystem.cacheDirectory;
    const files = await FileSystem.readDirectoryAsync(cacheDir);

    for (const file of files) {
      await FileSystem.deleteAsync(`${cacheDir}${file}`);
    }

    // Step 2: Clear all data and state
    await reset();
    await dropTables();
    const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(dbFilePath);
    }

    // Step 3: Force app restart
    Alert.alert('App will be restarted', 'Data and cache cleared.');
    setTimeout(async () => {
      RNRestart.restart();
    }, 3000);
  } catch (error) {
    console.error('Error clearing app data:', error);
    Alert.alert('Error', 'An error occurred while clearing app data');
  }
};
