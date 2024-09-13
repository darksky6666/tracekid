import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { imageMap } from '../constants/ImageMap';
import { colors } from '../constants/Colors';

const ItemDetailModal = ({ visible, item, onClose, onAddToCart, onBuyNow }) => {
  const itemImage = imageMap[item.id] || null;
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color={colors.textBtmSheet} />
          </TouchableOpacity>

          <Image
            style={styles.modalImage}
            source={itemImage}
            resizeMode="cover"
          />
          <Text style={styles.modalName}>{item.name}</Text>
          <Text style={styles.modalPrice}>{item.price}</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => {
                Vibration.vibrate(50);
                handleQuantityChange(-1);
              }}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => {
                Vibration.vibrate(50);
                handleQuantityChange(1);
              }}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={onAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onBuyNow}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  modalName: {
    fontFamily: 'Shift-Type-Basic',
    fontSize: 24,
    marginVertical: 10,
  },
  modalPrice: {
    fontFamily: 'Shift-Type-Basic',
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  quantity: {
    fontFamily: 'Shift-Type-Basic',
    fontSize: 18,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: colors.lightBlue,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Shift-Type-Basic',
    color: colors.textBtmSheet,
    fontSize: 19,
  },
  quantityButton: {
    marginHorizontal: 10,
    backgroundColor: colors.lightBlue,
    height: 40,
    width: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontFamily: 'Shift-Type-Basic',
    color: colors.textBtmSheet,
    fontSize: 18,
  },
});

export default ItemDetailModal;
