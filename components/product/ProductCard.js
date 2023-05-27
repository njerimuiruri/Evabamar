import React, {memo} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Rating} from 'react-native-ratings';
import {icons} from '../../constants';

const ProductCard = ({product, navigation}) => {
  return (
    <View className="flex items-center p-1">
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetails', {
            id: product._id,
          })
        }>
        <Image
          source={{uri: product.images[0].url}}
          className="w-[120px] h-[120px]"
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text className="text-black text-[13px] mt-3">
        {product.description.slice(0, 24)}
        {product.description.length > 24 ? '...' : ''}
      </Text>
      <Text className="text-black text-[15px] font-bold text-center mt-[5px]">
        Ksh {Math.floor(product.price).toLocaleString()}
      </Text>

      <View className="flex flex-row space-x-9 items-center">
        <Rating
          type="custom"
          ratingColor="orange"
          ratingBackgroundColor="#c8c7c8"
          ratingCount={5}
          imageSize={15}
          readonly
          style={{paddingVertical: 5}}
          startingValue={3}
        />
        <TouchableOpacity>
          <Image
            source={icons.addtofav}
            className="w-[20px] h-[20px]"
            resizeMode="contain"
            alt="rating icon"
            style={{tintColor: 'black'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard;
