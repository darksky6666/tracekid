import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../constants/Colors';

const ItemFilter = ({ itemTypes, selectedType, onSelectType }) => {
  return (
    <View style={styles.container}>
      {itemTypes.map((type) => (
        <TouchableOpacity
          key={type}
          style={[
            styles.button,
            selectedType === type && styles.selectedButton,
          ]}
          onPress={() => onSelectType(type)}
        >
          <Text
            style={[
              styles.buttonText,
              selectedType === type && styles.selectedButtonText,
            ]}
          >
            {type}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 10,
  },
  button: {
    backgroundColor: colors.lightBlue,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
  },
  selectedButton: {
    backgroundColor: colors.textBtmSheet,
  },
  buttonText: {
    color: colors.textBtmSheet,
    fontSize: 18,
    fontFamily: 'Shift-Type-Basic',
  },
  selectedButtonText: {
    color: '#fff',
  },
});

export default ItemFilter;
