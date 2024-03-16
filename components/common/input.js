import { View, Text, TextInput, StyleSheet } from 'react-native';

import { Colors, GolbalColors } from '../../constants/styles';

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  placeholder,
  numberOfLines
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize={false}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={placeholder}
        numberOfLines={numberOfLines}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    color: 'white',
    marginBottom: 7,
  },
  labelInvalid: {
    color: "red",
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: GolbalColors.BG2,
    borderRadius: 4,
    fontSize: 16,
    borderTopLeftRadius:8,
     borderTopRightRadius:8,
     borderBottomRightRadius:8,
     borderBottomLeftRadius:8
  },
  inputInvalid: {
    backgroundColor: GolbalColors.error,
  },
});
