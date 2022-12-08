import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import SplashScreen from './src/components/SplashScreen';
import Login from './src/components/Login';
import Register from './src/components/Register';
import Navigation from './src/navigation/Navigation';
import RestaurantMenu from './src/screens/Restaurants/RestaurantMenu';
import RestaurantSummaryOrder from './src/screens/Restaurants/RestaurantSummaryOrder';

const Stack = createStackNavigator ();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
      <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
      <Stack.Screen name="Navigation" component={Navigation} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Yantramanav: require('./assets/fonts/Yantramanav-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
      return null;
  }
  return(
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}