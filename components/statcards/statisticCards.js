import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {icons} from '../../constants';

const StatisticCards = () => {
  return (
    <View className=" py-3">
      {/* part a  */}
      <View className=" flex flex-row justify-between ">
        <TouchableOpacity className="w-[48%] h-[150px] bg-gray-100 rounded-md  px-6 flex justify-evenly">
          <View className="flex flex-row justify-between items-center ">
            <TouchableOpacity className=" bg-green-500 p-3 rounded-full">
              <FastImage
                source={icons.bar}
                className="w-[30px] h-[30px]"
                resizeMode="contain"
                tintColor={'white'}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <FastImage
                source={icons.dotmenu}
                className="w-[30px] h-[30px]"
                resizeMode="contain"
                tintColor={'gray'}
              />
            </TouchableOpacity>
          </View>
          <View className="mt-1 flex space-y-1">
            <Text className="text-black text-[13px]" style={styles.customFont}>
              Total Profit
            </Text>
            <View className="flex flex-row space-x-2 items-center">
              <Text className="text-black font-semibold">20.7k</Text>
              <Text className="text-[11px] text-green-500">+38%</Text>
            </View>
            <Text className="text-[13px] text-black">Weekly Profit</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="w-[48%] h-[150px] bg-gray-100 rounded-md  px-6 flex justify-evenly">
          <View className="flex flex-row justify-between items-center ">
            <TouchableOpacity className=" bg-red-500 p-3 rounded-full">
              <FastImage
                source={icons.loss}
                className="w-[30px] h-[30px]"
                resizeMode="contain"
                tintColor={'white'}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <FastImage
                source={icons.dotmenu}
                className="w-[30px] h-[30px]"
                resizeMode="contain"
                tintColor={'gray'}
              />
            </TouchableOpacity>
          </View>
          <View className="mt-1 flex space-y-1">
            <Text className="text-black text-[13px]" style={styles.customFont}>
              Total Loss
            </Text>
            <View className="flex flex-row space-x-2 items-center">
              <Text className="text-black font-semibold">2.2k</Text>
              <Text className="text-[11px] text-red-500">-8%</Text>
            </View>
            <Text className="text-[13px] text-black">Last Week</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* partb */}
      <View className="flex flex-row justify-between mt-2">
        <TouchableOpacity className="w-[48%] h-[150px] bg-gray-100 rounded-md  px-6 flex justify-evenly">
          <View className="flex flex-row justify-between items-center ">
            <TouchableOpacity className=" bg-green-500 p-3 rounded-full">
              <FastImage
                source={icons.sales}
                className="w-[30px] h-[30px]"
                resizeMode="contain"
                tintColor={'white'}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <FastImage
                source={icons.dotmenu}
                className="w-[30px] h-[30px]"
                resizeMode="contain"
                tintColor={'gray'}
              />
            </TouchableOpacity>
          </View>
          <View className="mt-1 flex space-y-1">
            <Text className="text-black text-[13px]" style={styles.customFont}>
              Total Sales
            </Text>
            <View className="flex flex-row space-x-2 items-center">
              <Text className="text-black font-semibold">260.7k</Text>
              <Text className="text-[11px] text-green-500">+8%</Text>
            </View>
            <Text className="text-[13px] text-black">Yearly Sales</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="w-[48%] h-[150px] bg-gray-100 rounded-md  px-6 flex justify-evenly">
          <View className="flex flex-row justify-between items-center ">
            <TouchableOpacity className=" bg-green-500 p-3 rounded-full">
              <FastImage
                source={icons.orders}
                className="w-[30px] h-[30px]"
                resizeMode="contain"
                tintColor={'white'}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <FastImage
                source={icons.dotmenu}
                className="w-[30px] h-[30px]"
                resizeMode="contain"
                tintColor={'gray'}
              />
            </TouchableOpacity>
          </View>
          <View className="mt-1 flex space-y-1">
            <Text className="text-black text-[13px]" style={styles.customFont}>
              Total Orders
            </Text>
            <View className="flex flex-row space-x-2 items-center">
              <Text className="text-black font-semibold">2.7k</Text>
              <Text className="text-[11px] text-green-500">+2%</Text>
            </View>
            <Text className="text-[13px] text-black">Weekly Orders</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
  customColor: {
    color: '#e52e04',
  },
});

export default StatisticCards;
