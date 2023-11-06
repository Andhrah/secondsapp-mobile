import { GestureResponderEvent, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import Icon from 'react-native-remix-icon';
import colors from "../constant/colors";

type CloseButtonProps = {
  style?: StyleProp<ViewStyle>;
  onPress: (event: GestureResponderEvent) => void;
  name?: string,
}

/**
 * 
 * @returns {JSX.Element} - A touchable opacity component with an Icon inside.
 */
const CloseButton = ({ style, onPress, name }:CloseButtonProps):JSX.Element => {
  return (
    <TouchableOpacity testID="app-button" accessible={true} onPress={onPress} style={[styles.container, style]}>
      <Icon name={name || "close-line" } color={colors.steelGray} size={34} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 11,
    alignSelf: "flex-start"
  }
});

export { CloseButton };
