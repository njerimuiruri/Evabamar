import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {icons} from '../constants';
import {Badge, Box, Divider, VStack} from 'native-base';

const Header = ({navigation}) => {
  const styles = StyleSheet.create({
    customFont: {
      fontFamily: 'serif',
    },
    customColor: {
      color: '#e52e04',
    },
  });

  return (
    <View className="bg-white">
      <View className="mb-2 mx-2  flex flex-row justify-between items-center">
        <View className="flex flex-row space-x-3 items-center">
          <TouchableOpacity
            className="border border-gray-300 p-[3px] rounded-md"
            onPress={() => navigation.openDrawer()}>
            <Image
              source={icons.menu}
              className="w-[25px] h-[25px]"
              style={{tintColor: 'black'}}
            />
          </TouchableOpacity>

          <Text
            className="text-black text-[20px] font-bold"
            style={styles.customFont}>
            Evabamar
          </Text>
        </View>
        <View className="flex flex-row space-x-6">
          <TouchableOpacity>
            <Image
              source={icons.profilePlaceholder}
              className="w-[40px] h-[40px]"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;
