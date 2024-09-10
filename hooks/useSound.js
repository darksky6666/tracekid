import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

export const useSound = (soundFile) => {
  const [sound, setSound] = useState();

  const playSound = async () => {
    try {
      if (sound) {
        await sound.replayAsync();
      } else {
        const { sound: newSound } = await Audio.Sound.createAsync(soundFile);
        setSound(newSound);
        await newSound.playAsync();
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const stopSound = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
      }
    } catch (error) {
      console.error('Error stopping sound:', error);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return { playSound, stopSound };
};
