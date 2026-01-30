import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import navigationStrings from '../constants/navigationStrings';
import { AlbumDetails, Dashboard } from '../Screens';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={navigationStrings.DASHBOARD}
          component={Dashboard}
        />
        <Stack.Screen
          name={navigationStrings.ALBUM_DETAILS}
          component={AlbumDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
