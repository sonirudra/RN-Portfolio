import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import MainScreen from '../screens/MainScreen';
import InputScreen from '../screens/InputScreen';
import {ScreenName} from './screenNames';

const Stack = createStackNavigator();

const RootStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={ScreenName.INPUT} component={InputScreen} />
      <Stack.Screen name={ScreenName.MAIN} component={MainScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
