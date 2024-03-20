import Colors from '@/constants/Colors';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  name: string;
  desc1: string;
  desc2: string;
};

export const ListHeader = ({ name, desc1, desc2 }: Props) => (
  <View style={{ backgroundColor: Colors.lightGrey }}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.desc}>{desc1}</Text>
    <Text style={styles.desc}>{desc2}</Text>
  </View>
);

const styles = StyleSheet.create({
  name: {
    fontSize: 30,
    margin: 16,
  },
  desc: {
    fontSize: 16,
    margin: 16,
    lineHeight: 22,
    color: Colors.medium
  },
});
