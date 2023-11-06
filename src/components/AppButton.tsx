import { GestureResponderEvent, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-remix-icon';
import colors from "../constant/colors";

const { lightAsh, darkAsh } = colors;


/**
 * @description The properties for the `Button` component.
 *
 * @typedef {object} AppButtonProps
 * @property {() => void} [onPress] - The function that will be called when the button is pressed.
 * @property {React.ReactNode} [children] - The children to render inside the button.
 * @property {StyleProp<ViewStyle>} [style] - Style object to pass to the button.
 * @property {StyleProp<TextStyle>} [textStyle] - Style object to pass to the text inside the button.
 */
type AppButtonProps = {
  children: React.ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  startIconName?: string;
}

/**
 * @description A button component.
 *
 * @param {BackButtonProps} props - Properties for the component.
 * @returns {JSX.Element} - A touchable opacity component with an image or Icon inside.
 */
const AppButton = ({ children, style, textStyle, onPress, disabled, startIconName }:AppButtonProps):JSX.Element => {

  const { container, title } = styles;

  return (
    <TouchableOpacity testID="app-button" accessible={true} onPress={onPress} style={[container, style]} disabled={disabled}>
      {startIconName && <Icon name={startIconName} color="#0A5001" size={20} style={{}} />
        }
      <Text style={[title, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: lightAsh,
    width: "30%",
    height: 44,
    justifyContent: "center",
    borderRadius: 4,
    alignSelf: "center",
    flexDirection: "row"
  },
  title: {
    color: darkAsh,
    fontSize: hp(2.2)
  }
})

export { AppButton };
