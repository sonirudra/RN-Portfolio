import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import JDTextInput from '../components/JDTextInput';
import {COLORS} from '../theme/Colors';
import {ScreenName} from '../navigator/screenNames';

const InputScreen = () => {
  const navigation = useNavigation();

  const [number, setNumber] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleUserInput = useCallback((text: string) => {
    setNumber(text);
  }, []);

  const handleSubmit = () => {
    if (parseInt(number, 10) > 0) {
      navigation.navigate(ScreenName.MAIN as never, {userInput: number});
    } else {
      setError('Please enter number greater than 0.');
      return;
    }
  };

  return (
    <View style={styles.container}>
      <JDTextInput
        value={number}
        onChangeText={handleUserInput}
        placeholder="Enter a number"
        secureTextEntry={false}
        keyBoardType="number-pad"
        maxLength={1}
      />
      {error && <Text>{error}</Text>}
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnLabel}>Let's Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    color: COLORS.text,
    paddingVertical: 10,
    alignItems: 'center',
    marginVertical: 12,
  },
  btnLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
});

export default InputScreen;
