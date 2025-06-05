import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  buttonType?: 'primary' | 'danger' | 'info';
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, style, textStyle, buttonType = 'primary', disabled = false }) => {
  const buttonStyles: ViewStyle[] = [globalStyles.button];
  const textStylesArray: TextStyle[] = [globalStyles.buttonText];

  if (buttonType === 'danger') {
    buttonStyles.push(globalStyles.dangerButton);
  } else if (buttonType === 'info') {
    buttonStyles.push(globalStyles.infoButton);
  }

  if (disabled) {
    buttonStyles.push(styles.disabledButton);
    textStylesArray.push(styles.disabledText);
  }

  const combinedButtonStyles = StyleSheet.flatten([
    ...buttonStyles,
    style,
  ]);

  const combinedTextStyles = StyleSheet.flatten([
    ...textStylesArray,
    textStyle,
  ]);

  return (
    <TouchableOpacity style={combinedButtonStyles} onPress={onPress} disabled={disabled}>
      <Text style={combinedTextStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  disabledText: {
    color: '#666666',
  }
});

export default CustomButton;