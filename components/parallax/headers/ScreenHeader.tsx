import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { HeaderBackButtonProps } from "@react-navigation/elements";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';

export const HeaderLeft = (props: HeaderBackButtonProps) => (
  <TouchableOpacity onPress={props.onPress} style={styles.roundButton}>
    <Ionicons name='arrow-back' size={24} color={Colors.primary} />
  </TouchableOpacity>
);

export const HeaderRight = () => (
  <View style={styles.rightButtons}>
    <TouchableOpacity style={styles.roundButton}>
      <Ionicons name='share-outline' size={24} color={Colors.primary} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.roundButton}>
      <Ionicons name='search-outline' size={24} color={Colors.primary} />
    </TouchableOpacity>
  </View>
);

type Props = {
  headerText: string,
  headerStyle: { opacity: number; }
};

export const HeaderBackground = ({ headerText, headerStyle }: Props) => (
  <Animated.View style={[styles.background, headerStyle]}>
    <Text style={styles.headerText}>{headerText}</Text>
  </Animated.View>
);

export const styles = StyleSheet.create({
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  background: {
    flex: 1,
    flexDirection: 'column-reverse',
    height: 100,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 20,
    marginBottom: 10,
  },
});
