declare module 'react-native-vector-icons/MaterialCommunityIcons' {
  import { FunctionComponent } from 'react';
  import { TextStyle, ViewStyle } from 'react-native';

  export interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: TextStyle | ViewStyle;
  }

  const Icon: FunctionComponent<IconProps>;
  export default Icon;
}
