import Colors from '@/constants/Colors';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  title: string,
  isActive: boolean,
  onPress: () => void,
};

export const StickyMenuButton = ({ title, isActive, onPress }: Props) => {
  const buttonStyle = isActive ? styles.buttonActive : styles.button;
  const titleStyle = isActive ? styles.textActive : styles.text;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50,
  },
  text: {
    color: Colors.primary,
    fontSize: 16,
  },
  buttonActive: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50,
  },
  textActive: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
