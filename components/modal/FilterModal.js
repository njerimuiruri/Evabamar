import React, {useEffect, useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import {
  View,
  Text,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import {icons} from '../../constants';
import FastImage from 'react-native-fast-image';
import {FlatList, Input} from 'native-base';
import {useToast} from 'react-native-toast-notifications';
import axios from 'axios';
import {base_url} from '../../utils/baseUrl';
import config from '../../utils/axiosconfig';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FilterModal = ({isVisible, onClose, product}) => {
  const {width, height} = Dimensions.get('window');
  const [selectedQty, setSelectedQty] = useState(null);
  const [categoryId, setCategoryId] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(isVisible);
  const [value, setValue] = useState(1);
  const [loading, setLoading] = useState(false);

  // console.log(product);

  const toast = useToast();

  const cartData = {
    productId: categoryId,
    quantity: value,
  };

  // console.log(cartData);

  const addToCart = async token => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });
      setLoading(true);

      const res = await api.post('/cart', cartData);
      // console.log(res);
      if (res.data.message == 'Item added to cart successfully') {
        setLoading(false);
        toast.show(
          `${value}, ${selectedQty}Kgs ${product.title} added to cart`,
          {
            type: 'success',
            placement: 'top',
            duration: 2000,
            offset: 30,
            animationType: 'zoom-in',
          },
        );
        setTimeout(() => {
          onClose();
        }, 2000);
      }
      if (res.data.err == 'Not Authorized token expired, Please Login again') {
        setLoading(false);
        toast.show(`Please login to continue`, {
          type: 'danger',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'zoom-in',
        });
      }
    } catch (err) {
      if (err.response.data.message == 'Requested quantity not available') {
        setLoading(false);
        toast.show(`Inventory shortage!`, {
          type: 'danger',
          placement: 'top',
          duration: 2000,
          offset: 30,
          animationType: 'zoom-in',
        });
      }
      console.log(err);
    }
  };

  const handleCartData = async () => {
    if (selectedQty === null) {
      return toast.show('Please select the correct gas quantity', {
        type: 'warning',
        placement: 'top',
        duration: 2000,
        offset: 30,
        animationType: 'zoom-in',
      });
    }
    // Retrieving token
    try {
      const token = await AsyncStorage.getItem('token');
      addToCart(token);
    } catch (error) {
      console.log('Error retrieving token:', error);
    }
    console.log('next2');
  };

  // console.log(cartData);
  const handleMinusClick = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const handlePlusClick = () => {
    setValue(value + 1);
  };

  //animation
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (showFilterModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showFilterModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height + 100, height - 570],
  });

  return (
    <Modal transparent={true} visible={isVisible} animationType="fade">
      <View
        className="bg-white flex-1"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
        {/* transparent background */}
        <TouchableWithoutFeedback onPress={() => setShowFilterModal(false)}>
          <View className="absolute top-0 left-0 right-0 bottom-0 " />
        </TouchableWithoutFeedback>
        {/* animated pushup */}
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            top: modalY,
            width: '100%',
            height: '80%',
            padding: 8,
            backgroundColor: 'white',
          }}>
          {/* loading animation  */}
          {loading ? (
            <View
              className={`absolute top-[36%] left-[36%]
          `}>
              <LottieView
                source={require('../../assets/Evabamar.json')}
                autoPlay
                loop
                width={120}
                height={120}
              />
            </View>
          ) : null}

          <View>
            <View className="px-1">
              <View className="flex flex-row justify-between">
                <View className="flex flex-row space-x-4 items-center relative">
                  <FastImage
                    source={{uri: product.images[0].url}}
                    className="w-[80px] h-[80px]"
                    resizeMode="contain"
                  />
                  {product.quantity < 1 ? (
                    <Text className="text-black absolute top-0 right-[0px] bg-gray-200 p-1 rounded-full text-[12px]">
                      out of stock
                    </Text>
                  ) : null}

                  <View className="">
                    <Text className="text-black text-[18px] font-bold">
                      KSh {product?.price.toLocaleString()}
                    </Text>
                    <Text className="text-black text-[12px]">
                      in Stock {product.quantity}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  className="border h-[25px] w-[25px] items-center justify-center rounded-full border-gray-400"
                  onPress={() => onClose()}>
                  <FastImage
                    source={icons.cross}
                    className="w-[20px] h-[20px]"
                    resizeMode="contain"
                    tintColor={'gray'}
                  />
                </TouchableOpacity>
              </View>

              {/* quantity  */}
              <View className="mt-[30px]">
                <Text className="text-black text-[17px]">Quantity</Text>
                <View className="mt-[10px]">
                  <FlatList
                    data={product.category}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={<View className="w-3" />}
                    keyExtractor={item => `${item._id}`}
                    renderItem={({item}, props) => {
                      return (
                        <>
                          <TouchableOpacity
                            className={`rounded-md border p-2 ${
                              selectedQty == item.kgs
                                ? 'border-red-600'
                                : 'border-green-600'
                            }`}
                            onPress={() => {
                              setSelectedQty(item.kgs), setCategoryId(item._id);
                            }}>
                            <FastImage
                              source={{uri: product.images[0].url}}
                              className="w-[70px] h-[70px]"
                              resizeMode="contain"
                            />
                            <Text className="text-[13px] text-center font-bold text-black">
                              {item.kgs} Kgs
                            </Text>
                          </TouchableOpacity>
                        </>
                      );
                    }}
                  />
                </View>
              </View>

              {/* quantity table */}
              <View className="mt-[40px] items-end">
                <Input
                  w={{
                    base: '30%',
                    md: '25%',
                  }}
                  h={{
                    base: '35%',
                    md: '25%',
                  }}
                  className="text-black text-[14px]"
                  value={value.toString()} // convert the value to a string before passing it to the Input component
                  colorScheme={'gray'}
                  InputLeftElement={
                    <TouchableOpacity
                      className=" h-full w-[37px] items-center justify-center border-r border-gray-300"
                      onPress={handleMinusClick} // call the handleMinusClick function when the minus button is clicked
                    >
                      <FastImage
                        source={icons.minus}
                        resizeMode="contain"
                        className="w-[15px] h-[15px]"
                        tintColor={'black'}
                      />
                    </TouchableOpacity>
                  }
                  InputRightElement={
                    <TouchableOpacity
                      className="h-full w-[37px] items-center justify-center border-l border-gray-300"
                      onPress={handlePlusClick} // call the handlePlusClick function when the plus button is clicked
                    >
                      <FastImage
                        source={icons.plus}
                        resizeMode="contain"
                        className="w-[15px] h-[15px]"
                        tintColor={'black'}
                      />
                    </TouchableOpacity>
                  }
                />
              </View>
            </View>
            {product.quantity > 0 ? (
              <TouchableOpacity
                className="absolute top-[460px] w-full  h-[50px] bg-green-500 rounded-full items-center justify-center"
                onPress={() => handleCartData()}>
                <Text className="text-white text-[17px] font-bold">OK</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="absolute top-[460px] w-full  h-[50px] bg-green-500 rounded-full items-center justify-center"
                onPress={() => {
                  toast.show(`Out of Stock!`, {
                    type: 'danger',
                    placement: 'top',
                    duration: 4000,
                    offset: 30,
                    animationType: 'zoom-in',
                  });
                  setTimeout(() => {
                    onClose();
                  }, 2000);
                }}>
                <Text className="text-white text-[17px] font-bold">
                  Out of Stock
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {/* apply filters button  */}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;
