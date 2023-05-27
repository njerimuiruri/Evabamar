import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {icons} from '../../constants';

const Header = ({navigation}) => {
  return (
    <View className="h-[55px] bg-gray-100 flex flex-row items-center justify-between px-2">
      <View className="flex flex-row space-x-3 items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={icons.backarrow}
            className="w-[25px] h-[25px]"
            resizeMode="contain"
            style={{tintColor: 'black'}}
            alt="image"
          />
        </TouchableOpacity>

        <Text className="text-black font-bold text-[20px]">Details</Text>
      </View>
      <View className="flex flex-row space-x-4 items-center">
        <TouchableOpacity className="relative  bg-white  p-2.5 rounded-full">
          <Image
            source={icons.search}
            className="w-[20px] h-[20px]"
            resizeMode="contain"
            style={{tintColor: 'black'}}
            alt="image"
          />
        </TouchableOpacity>

        <TouchableOpacity className=" bg-white  p-2.5 rounded-full">
          <Image
            source={icons.heart}
            className="w-[20px] h-[20px]"
            style={{tintColor: 'black'}}
          />
        </TouchableOpacity>
        <TouchableOpacity className="relative bg-white  p-2.5 rounded-full">
          <Image
            source={icons.cart}
            className="w-[20px] h-[20px]"
            style={{tintColor: 'black'}}
          />
          <View className="absolute right-[0px] top-[0px] bg-red-500 rounded-full  h-[17px] w-[17px] items-center flex justify-center">
            <Text className="text-[11px] text-center text-white">2</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
