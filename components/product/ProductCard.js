import React, {memo, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Rating} from 'react-native-ratings';
import {icons} from '../../constants';
import {Button, Popover} from 'native-base';
import FastImage from 'react-native-fast-image';

const ProductCard = ({
  product,
  navigation,
  setPressedId,
  setModalVisible,
  setGasTitle,
}) => {
  // console.log(pressedId);

  return (
    <View className="flex items-center p-1">
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetails', {
            product: product,
          })
        }>
        <Image
          source={{uri: product.images[0].url}}
          className="w-[120px] h-[120px]"
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text className="text-black text-[13px] mt-3" style={styles.customFont}>
        {product.title}
      </Text>
      <Text className="text-black text-[15px] font-bold text-center mt-[5px]">
        Ksh {product.price}
      </Text>
      <TouchableOpacity
        shadow={2}
        colorScheme="danger"
        onPress={() => {
          setPressedId(product._id),
            setGasTitle(product.title),
            setModalVisible(true);
        }}>
        <Button
          mt={2}
          className="bg-green-600 text-white"
          style={styles.customFont}
          disabled={true}>
          <Text
            style={styles.customFont}
            className="text-white font-bold text-[12px]">
            Options
          </Text>
        </Button>
      </TouchableOpacity>
      <View className="absolute top-1 right-1 bg-green-300 rounded-md">
        <View className="flex flex-row items-center space-x-1 p-0.5 ">
          <Text className="text-black text-[11px]">units</Text>
          <Text className="text-red-600 text-[11px]">{product.quantity}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
});
export default ProductCard;
