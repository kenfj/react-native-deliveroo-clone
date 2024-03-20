import { ImageSourcePropType } from 'react-native';


export type Item = {
  id: number;
  name: string;
  price: number;
  info: string;
  img: ImageSourcePropType;
};
