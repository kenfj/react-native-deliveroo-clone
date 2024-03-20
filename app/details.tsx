import { restaurant } from '@/assets/data/restaurant';
import ParallaxSectionList, { ListHeader } from '@/components/parallax';
import { Item, Section, SectionHeader, SectionItem } from '@/components/sections';
import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

const sections: Section[] = restaurant.food.map((item, index) => ({
  index,
  title: item.category,
  data: item.meals,
}));

const Details = () => {
  const listHeader = <ListHeader
    name={restaurant.name}
    desc1={restaurant.delivery + " " + restaurant.tags.join("・")}
    desc2={restaurant.about}
  />;

  return (
    <ParallaxSectionList<Item, Section>
      headerText={restaurant.name}
      imageSource={restaurant.img}
      imageHeight={250}
      ListHeader={listHeader}
      SectionHeader={SectionHeader}
      SectionItem={SectionItem}
      sections={sections}
      containerStyle={styles.container}
      sectionListStyle={styles.detailsContainer}
    />
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    backgroundColor: Colors.lightGrey,
  },
});

export default Details;
