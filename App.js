import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Animated,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider, Box} from 'native-base';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from './components/SplashScreen';
const Stack = createNativeStackNavigator();
import {
  OnBoarding,
  SignIn,
  SignUp,
  Otp,
  ForgotPassword,
  NewPassword,
  ProductDetails,
  Account,
  Cart,
} from './screens';
import DrawerNav from './navigation/drawer/drawer1/DrawerNav1';
import {ToastProvider} from 'react-native-toast-notifications';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load resources and data in the background
        await Promise.all([]);

        // Check if this is the app's first launch
        const FirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
        if (FirstLaunch === null) {
          setIsFirstLaunch(true);
          await AsyncStorage.setItem('isFirstLaunch', 'false');
        }

        // Set isLoading to false
        setTimeout(() => {
          setIsLoading(false);
        }, 6500);
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  // if (isFirstLaunch) {
  //   // Render first launch screen
  //   return (
  //     <NavigationContainer>
  //       <Stack.Navigator
  //         screenOptions={{
  //           headerShown: false,
  //         }}>
  //         <Stack.Screen
  //           name="onBoardingScreen"
  //           component={OnBoarding}
  //           options={{headerShown: false}}
  //         />
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   );
  // }

  return (
    <NativeBaseProvider>
      <ToastProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={'white'}
        />

        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Otp"
              component={Otp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="NewPassword"
              component={NewPassword}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="DrawerNav"
              component={DrawerNav}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetails}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Account"
              component={Account}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </NativeBaseProvider>
  );
}

{
  /* <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
<Text>Hello, world!</Text>
</SafeAreaView> */
}
