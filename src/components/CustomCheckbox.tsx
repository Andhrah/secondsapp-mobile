import { GestureResponderEvent, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import colors from "../constant/colors";

const { appWhite } = colors;

type CustomCheckboxProps = {
  style?: StyleProp<ViewStyle>;
  onSelect: (event: GestureResponderEvent) => void; // Using React Native event type
  selected: boolean;
  index: number 
}

const CustomCheckbox = ({
  selected, 
  onSelect, 
  style,
  index 
}:CustomCheckboxProps):JSX.Element => {
  const { container, checkbox, checkboxInner, checkboxLabel } = styles;
  return (
    <TouchableOpacity style={container} onPress={onSelect}>
      {selected ? (
        <>
          <View style={checkboxInner}>
            <Text style={checkboxLabel}>{index}</Text>
          </View>
        </>
      ): <View style={[style, checkbox]} />}
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  checkboxLabel: {
    color: appWhite,
    fontWeight: 'bold',
  },
  checkbox: {
    backgroundColor: appWhite,
    padding: 9,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: "#9D9D9D"
  }
});

export { CustomCheckbox };
