import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, Image, Animated} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {icons} from '../constants';
import {Home, SignIn, SignUp, Cart, Account} from '../screens';
import {useDrawerStatus} from '@react-navigation/drawer';

const Tab = createMaterialTopTabNavigator();

const TabArr = [
  {
    route: 'Home',
    label: 'HomeLayout',
    activeIcon: icons.home,
    inActiveIcon: require('../assets/icons/setting.png'),
    Component: Home,
  },
  {
    route: 'Categories',
    label: 'Categories',
    activeIcon: icons.categories,
    inActiveIcon: require('../assets/icons/setting.png'),
    Component: SignIn,
  },
  {
    route: 'Orders',
    label: 'Orders',
    activeIcon: icons.cart,
    inActiveIcon: require('../assets/icons/setting.png'),
    Component: Cart,
  },
  {
    route: 'Account',
    label: 'Account',
    activeIcon: icons.user,
    inActiveIcon: require('../assets/icons/setting.png'),
    Component: Account,
  },
];

export default function Tabs({navigation}) {
  const drawerStatus = useDrawerStatus();
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const borderRadius = useRef(new Animated.Value(0)).current;

  const openDrawer = useCallback(() => {
    Animated.timing(offsetValue, {
      toValue: 240,
      duration: 250,
      useNativeDriver: true,
    }).start();
    Animated.timing(scaleValue, {
      toValue: 0.9,
      duration: 250,
      useNativeDriver: true,
    }).start();
    Animated.timing(borderRadius, {
      toValue: 10,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [offsetValue, scaleValue, borderRadius]);

  const closeDrawer = useCallback(() => {
    Animated.timing(offsetValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
    Animated.timing(borderRadius, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [offsetValue, scaleValue, borderRadius]);

  useEffect(() => {
    drawerStatus === 'open' ? openDrawer() : closeDrawer();
  }, [drawerStatus, openDrawer, closeDrawer]);
  return (
    <View style={{backgroundColor: '#00B074', flex: 1}}>
      <Animated.View
        style={{
          transform: [{scale: scaleValue}, {translateX: offsetValue}],
          flex: 1,
          borderRadius: 10,
        }}>
        <Tab.Navigator
          tabBarPosition="bottom"
          screenOptions={{
            tabBarPressColor: 'transparent',
            swipeEnabled: false,
            tabBarShowLabel: true,
            tabBarIndicatorStyle: {
              position: 'absolute',
              top: 0,
              height: 5,
              width: 80,
              marginLeft: 10,
              marginRight: 25,
              backgroundColor: '#00B074',
              borderBottomRightRadius: 3,
              borderBottomLeftRadius: 3,
            },
            tabBarLabelStyle: {
              fontWeight: '600',
              fontFamily: 'serif',
              fontSize: 11,
              position: 'relative',
              top: -0,
              textTransform: 'capitalize',
            },
            tabBarStyle: {
              height: 60,
              borderTopWidth: 1,
              borderColor: '#E6E7E8',
              backgroundColor: 'white',
            },
            tabBarActiveTintColor: '#00B074',
            tabBarInactiveTintColor: 'black',
          }}>
          {TabArr.map((tab, index) => {
            const {route, Component, activeIcon, inActiveIcon} = tab;
            return (
              <Tab.Screen
                key={index}
                name={route}
                options={{
                  tabBarIcon: ({color, size, focused}) => (
                    <Image
                      source={activeIcon}
                      style={{
                        width: 23,
                        height: 23,
                        tintColor: focused ? '#00B074' : 'black',
                      }}
                      resizeMode="contain"
                    />
                  ),
                }}>
                {props => <Component {...props} navigation={navigation} />}
              </Tab.Screen>
            );
          })}
        </Tab.Navigator>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
});
