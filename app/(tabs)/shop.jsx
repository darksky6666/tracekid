import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Vibration,
} from 'react-native';
import ItemCard from '../../components/ItemCard';
import ItemDetailModal from '../../components/ItemDetailModal';
import HeaderComponent from '../../components/HeaderComponent';
import ItemFilter from '../../components/ItemFilter';
import AnimatedIcon from '../../components/AnimatedIcon';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../../constants/Colors';

const ShopPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('All');

  useEffect(() => {
    // Initialize items
    const fetchData = async () => {
      try {
        const response = await import('../../constants/Item.json');
        setItems(response.default);
        setFilteredItems(response.default);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchData();
    setSearchQuery('');
  }, []);

  const handleItemPress = (item) => {
    Vibration.vibrate(50);
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    Vibration.vibrate(50);
    setModalVisible(false);
    setSelectedItem(null);
  };

  const handleAddToCart = () => {
    Vibration.vibrate(50);
    handleCloseModal();
  };

  const handleBuyNow = () => {
    Vibration.vibrate(50);
    handleCloseModal();
  };

  useEffect(() => {
    const getFilteredItems = () => {
      return items.filter(
        (item) =>
          (selectedType === 'All' || item.type === selectedType) &&
          item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    };
    setFilteredItems(getFilteredItems());
  }, [searchQuery, selectedType, items, setFilteredItems]);

  const itemTypes = ['All', ...new Set(items.map((item) => item.type))];

  return (
    <View style={styles.container}>
      <HeaderComponent title="Shop" />
      <View style={styles.searchAndCartContainer}>
        <TextInput
          clearButtonMode="always"
          style={styles.searchBar}
          placeholder="Search items..."
          placeholderTextColor={colors.textBtmSheet}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => Vibration.vibrate(50)}
        >
          <AntDesign name="shoppingcart" size={34} color={colors.deviceMenuIconPink} />
        </TouchableOpacity>
      </View>
      <ItemFilter
        itemTypes={itemTypes}
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />
      {filteredItems.length === 0 ? (
        <View style={styles.notFoundContainer}>
          <AnimatedIcon iconName="search" />
          <Text style={styles.notFoundText}>
            Sorry, item '{searchQuery}' not found.
          </Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.itemContainer}
          data={filteredItems}
          renderItem={({ item }) => (
            <ItemCard
              item={item}
              onPress={() => {
                handleItemPress(item);
              }}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      )}

      {selectedItem && (
        <ItemDetailModal
          visible={modalVisible}
          item={selectedItem}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchAndCartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 5,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    backgroundColor: colors.lightBlue,
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    color: colors.textBtmSheet,
    fontFamily: 'Shift-Type-Basic',
    fontSize: 18,
  },
  cartButton: {
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 16,
    color: '#888',
    marginTop: 25,
  },
  itemContainer: {
    margin: 10,
    paddingTop: 5,
    paddingBottom: 30,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default ShopPage;
