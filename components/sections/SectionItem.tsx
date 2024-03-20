import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import { Image, SectionListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Item } from './Item';
import { Section } from './Section';

export const SectionItem: SectionListRenderItem<Item, Section> = ({ item }) => (
  <Link href={{ pathname: '/(modal)/dish', params: { id: item.id } }} asChild>
    <TouchableOpacity style={styles.button}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc}>{item.info}</Text>
        <Text style={styles.desc}>${item.price}</Text>
      </View>
      <Image source={item.img} style={styles.image} />
    </TouchableOpacity>
  </Link>
);

export const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    padding: 16,
    flexDirection: 'row',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 14,
    color: Colors.mediumDark,
    paddingVertical: 4,
  },
});
