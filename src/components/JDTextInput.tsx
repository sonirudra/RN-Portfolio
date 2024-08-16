import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
  LayoutChangeEvent,
} from 'react-native';

import {COLORS} from '../theme/Colors';

interface JDTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  maxLength?: number;
  keyBoardType?: KeyboardTypeOptions;
}

interface size {
  height: number;
  width: number;
}

const JDTextInput: React.FC<JDTextInputProps> = props => {
  const {
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    maxLength,
    keyBoardType,
  } = props;

  const [size, setSize] = useState<size>({width: 0, height: 0});

  const onLayout = (e: LayoutChangeEvent) => {
    const {x, y, width, height} = e.nativeEvent.layout;
    // console.log('on layout', x, y, width, height);
    setSize({height, width});
  };

  return (
    <View onLayout={onLayout} style={styles.container}>
      <View
        style={[styles.backView, {width: size?.width, height: size?.height}]}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        keyboardType={keyBoardType}
        style={styles.input}
        cursorColor={COLORS.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backView: {
    backgroundColor: COLORS.secondary,
    position: 'absolute',
    top: 6,
    left: 6,
    zIndex: 1,
    borderRadius: 3,
  },
  container: {
    height: 50,
    justifyContent: 'center',
    marginBottom: 12,
  },
  input: {
    position: 'relative',
    flex: 1,
    fontSize: 16,
    zIndex: 2,
    backgroundColor: COLORS.background,
    borderRadius: 5,
    borderWidth: 1.2,
    borderColor: COLORS.text,
    color: COLORS.text,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default JDTextInput;
