import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { StickyMenuButton } from './StickyMenuButton';

type Props = {
  titles: string[],
  menuStyle: StyleProp<ViewStyle>,
  activeIndex: number,
  handleOnPress: (index: number) => void,
};

export const StickyMenu = ({ titles, menuStyle, activeIndex, handleOnPress }: Props) => {
  return (
    <Animated.View style={[styles.menu, menuStyle]}>
      <View style={styles.menuShadow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.menuContainer}
        >
          {titles.map((title, index) => (
            <StickyMenuButton
              key={`${index}-${title}`}
              title={title}
              isActive={activeIndex === index}
              onPress={() => handleOnPress(index)} />
          ))}
        </ScrollView>
      </View>
    </Animated.View>
  );
};

export const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    height: 50,
    left: 0,
    right: 0,
    top: 98,
    backgroundColor: 'white',
    overflow: 'hidden',
    paddingBottom: 4,
  },
  menuShadow: {
    backgroundColor: 'white',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: '100%',
  },
  menuContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 20,
    paddingBottom: 4,
  }
});
