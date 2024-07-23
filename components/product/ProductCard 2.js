import React, {memo} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Rating} from 'react-native-ratings';
import {icons} from '../../constants';
import {Button} from 'native-base';

const ProductCard2 = ({
  product,
  navigation,
  image,
  setPressedId,
  setModalVisible,
  setGasTitle,
  setGaskgs,
}) => {
  return (
    <View className="flex items-center p-1">
      <TouchableOpacity>
        <Image
          source={{uri: image}}
          className="w-[120px] h-[120px]"
          resizeMode="contain"
        />
      </TouchableOpacity>

      <View className="flex flex-row space-x-1">
        <Text className="text-black text-[13px] mt-3" style={styles.customFont}>
          {product.kgs} Kgs
        </Text>
        <Text className="text-black text-[13px] mt-3" style={styles.customFont}>
          {product.title}
        </Text>
      </View>
      <Text className="text-black text-[15px] font-bold text-center mt-[5px]">
        Ksh {product.price}
      </Text>
      <TouchableOpacity
        shadow={2}
        colorScheme="danger"
        onPress={() => {
          setPressedId(product._id),
            setGasTitle(product.title),
            setModalVisible(true),
            setGaskgs(product.kgs);
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
export default ProductCard2;
