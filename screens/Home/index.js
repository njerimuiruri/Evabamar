import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import {
  BarChat2,
  StatisticCards,
  Header,
  PieChat2,
  BarChat,
  PieChat,
} from '../../components';
import axios from 'axios';
import {base_url} from '../../utils/baseUrl';
import config from '../../utils/axiosconfig';

const Home = ({navigation}) => {
  const [location, setLocation] = useState('N/A');
  const [city, setCity] = useState('');

  // Function to get address from latitude and longitude
  const getAddressFromCoords = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      );
      const data = await response.json();
      data.address.city === undefined
        ? setCity(data.address.town)
        : setCity(data.address.city);
      const address = `${data.address.country}`;
      setLocation(address);
      console.log(address);
    } catch (error) {
      console.error(error);
    }
  };

  // Request location permission and get current location
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            getAddressFromCoords(latitude, longitude);
          },
          error => console.error(error),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const verifyToken = async token => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const myPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await api.get(`user/verifyToken/`, config(token));
          if (response.data.message === 'authorized') {
          }

          resolve();
          // console.log(response);
        } catch (err) {
          console.log(err);
          reject();
        }
      });

      Toast.show({
        type: 'promise',
        promise: myPromise,
        visibilityTime: 2000,
        autoHide: true,
        onShow: () => {
          // Optional callback function for when the toast appears on the screen
        },
        onHide: () => {
          // Optional callback function for when the toast disappears from the screen
        },
        onDismiss: () => {
          // Optional callback function for when the toast is dismissed by the user
        },
        pendingProps: {
          message: 'Verifying your account information. Please wait...',
        },
        successProps: {
          message:
            'Account validation completed successfully. Congratulations! 🎉',
        },
        errorProps: {
          message:
            'Unable to validate your account. Please create a new account or log in with your existing credentials.',
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      requestLocationPermission();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const styles = StyleSheet.create({
    customFont: {
      fontFamily: 'serif',
    },
    customColor: {
      color: '#e52e04',
    },
  });

  return (
    <>
      <Header navigation={navigation} />
      <View className="bg-white h-full px-2">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text className="text-black" style={styles.customFont}>
              Hi Admin, welcome back!
            </Text>
          </View>

          <StatisticCards />
          <BarChat />
          <PieChat />
          <BarChat2 />
          <PieChat2 />
          <View className="h-[100px]" />
        </ScrollView>
      </View>
    </>
  );
};

export default Home;
