import React from 'react';
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { imageMap } from '../constants/ImageMap';
import { colors } from '../constants/Colors';

const ItemCard = ({ item, onPress }) => {
  const itemImage = imageMap[item.id] || null;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image style={styles.image} source={itemImage} resizeMode="cover" />

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: '44%',
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Shift-Type-Basic',
    marginVertical: 5,
    color: colors.textBtmSheet,
  },
  price: {
    fontSize: 18,
    fontFamily: 'Shift-Type-Basic',
    color: colors.textBtmSheet,
  },
});

export default ItemCard;
