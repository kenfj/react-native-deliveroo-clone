import categories from '@/assets/data/filter.json';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface Category {
  name: string,
  count: number,
  checked?: boolean,
}

const ItemBox = () => (
  <>
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.item}>
        <Ionicons name='arrow-down-outline' size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Sort</Text>
        <Ionicons name='chevron-forward' size={22} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name='fast-food-outline' size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Hygiene rating</Text>
        <Ionicons name='chevron-forward' size={22} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name='pricetag-outline' size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Offers</Text>
        <Ionicons name='chevron-forward' size={22} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name='nutrition-outline' size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Dietary</Text>
        <Ionicons name='chevron-forward' size={22} color={Colors.primary} />
      </TouchableOpacity>
    </View>
    <Text style={styles.header}>Categories</Text>
  </>
);

const Filter = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<Category[]>(categories);

  const handleClearAll = () => {
    const updatedItems = items.map((item) => {
      item.checked = false;
      return item;
    });
    setItems(updatedItems);
  };

  const renderItem: ListRenderItem<Category> = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.itemText}>
        {item.name} ({item.count})
      </Text>
      <BouncyCheckbox
        fillColor={Colors.primary}
        unfillColor='white'
        disableBuiltInState
        iconStyle={{ borderColor: Colors.primary, borderRadius: 4, borderWidth: 2 }}
        innerIconStyle={{ borderColor: Colors.primary, borderRadius: 4 }}
        onPress={() => {
          const isChecked = items[index].checked;
          const updatedItems = items.map((item) => {
            if (item.name === items[index].name) {
              item.checked = !isChecked;
            }
            return item;
          });
          setItems(updatedItems);
        }}
        isChecked={items[index].checked}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        ListHeaderComponent={<ItemBox />}
      />
      <View style={{ height: 76 }} />

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.fullButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.footerText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.lightGrey,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -10,
    },
  },
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  footerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderColor: Colors.grey,
    borderBottomWidth: 1,
  },
  itemText: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
});

export default Filter;
