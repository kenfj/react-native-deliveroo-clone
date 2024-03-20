import Colors from '@/constants/Colors';
import { SectionListData, StyleSheet, Text } from 'react-native';
import { Item } from './Item';
import { Section } from './Section';

export const SectionHeader = (
  info: { section: SectionListData<Item, Section>; }
) => (
  <Text style={styles.sectionHeader}>
    {info.section.title}
  </Text>
);

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 40,
    marginLeft: 16,
    backgroundColor: Colors.lightGrey,
  },
});
