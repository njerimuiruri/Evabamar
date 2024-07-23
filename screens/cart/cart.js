import axios from 'axios';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {base_url} from '../../utils/baseUrl';
import config from '../../utils/axiosconfig';
import {useToast} from 'react-native-toast-notifications';
import {SwipeListView} from 'react-native-swipe-list-view';
import FastImage from 'react-native-fast-image';
import {icons} from '../../constants';
import {AlertDialog, Button, Divider, Input} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);
  const toast = useToast();
  const [listData, setListData] = useState([]);
  const [total, setTotal] = useState(0);

  const getCart = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const res = await api.get('/cart');
      console.log(res.data);
      setListData(res.data.items);
      setTotal(res.data.totalPrice);

      if (res.data.err == 'Not Authorized token expired, Please Login again') {
        toast.show(`Please login to continue`, {
          type: 'danger',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'zoom-in',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateQuantityCart = async ({productId, quantity}) => {
    const token = await AsyncStorage.getItem('token');

    setLoading(true);
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });
      setLoading(true);

      const res = await api.patch('/cart', {productId, quantity});
      // console.log(res);
      setListData(res.data.cart.items);
      setTotal(res.data.cart.totalPrice);

      setLoading(false);
      toast.show(`Cart updated`, {
        type: 'success',
        placement: 'top',
        duration: 2000,
        offset: 30,
        animationType: 'zoom-in',
      });

      if (res.data.err === 'Not Authorized token expired, Please Login again') {
        toast.show(`Please login to continue`, {
          type: 'danger',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'zoom-in',
        });
      }
    } catch (err) {
      if (
        err.response.data.message ===
        'Product is not available in required quantity'
      ) {
        toast.show(`Inventory shortage!`, {
          type: 'danger',
          placement: 'top',
          duration: 2000,
          offset: 30,
          animationType: 'zoom-in',
        });
        setLoading(false);
      }
      if (err.response.data.message === 'Invalid quantity') {
        toast.show(`Minimum reached!`, {
          type: 'danger',
          placement: 'top',
          duration: 2000,
          offset: 30,
          animationType: 'zoom-in',
        });
        setLoading(false);
      }
      console.log(err);
    }
  };

  const removeCartItem = async productId => {
    const token = await AsyncStorage.getItem('token');

    console.log(`Removing ${productId}`);
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });
      setLoading(true);

      const res = await api.put('/cart/remove-one', {
        productId,
      });
      // console.log(res);
      setListData(res.data.cart.items);
      setTotal(res.data.cart.totalPrice);

      toast.show(`Product removed`, {
        type: 'success',
        placement: 'top',
        duration: 2000,
        offset: 30,
        animationType: 'zoom-in',
      });
      setLoading(false);

      if (res.data.err === 'Not Authorized token expired, Please Login again') {
        toast.show(`Please login to continue`, {
          type: 'danger',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'zoom-in',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const clearCart = async () => {
    const token = await AsyncStorage.getItem('token');

    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });
      setLoading(true);

      const res = await api.put('/cart');
      console.log(res);
      setListData([]);
      setTotal(0);

      toast.show(`Cart cleared`, {
        type: 'success',
        placement: 'top',
        duration: 2000,
        offset: 30,
        animationType: 'zoom-in',
      });
      setLoading(false);

      if (res.data.err === 'Not Authorized token expired, Please Login again') {
        toast.show(`Please login to continue`, {
          type: 'danger',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'zoom-in',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Function to be executed when the screen comes into focus
      // Example: Fetch cart content

      // Call the function
      getCart();

      // Optionally, return a cleanup function if needed
      // This will be executed when the component unmounts or when the screen loses focus
      return () => {
        // Clean up any subscriptions or resources if needed
      };
    }, []),
  );

  const onSwipeValueChange = swipeData => {
    const {key, item, value} = swipeData;
    if (value < -250) {
      // toast.show(`Please click delete icon to remove item from cart!`, {
      //   type: 'warning',
      //   placement: 'top',
      //   duration: 2000,
      //   offset: 30,
      //   animationType: 'zoom-in',
      // });
    }
  };

  const renderItem = data => (
    <TouchableOpacity
      className="bg-white border-b-[1px] border-gray-100 py-4 px-2 relative"
      activeOpacity={1}>
      <View className="flex flex-row space-x-3 items-center">
        <FastImage
          source={{uri: data.item.product.icon}}
          className="w-[100px] h-[100px]"
          resizeMode="contain"
        />
        <View className="flex space-y-1">
          <Text
            className="text-[17px] text-black w-[70vw]"
            style={styles.customFont}>
            {data.item.product.title}
          </Text>
          <Text className="text-[11px] text-gray-500 w-[70vw]">
            unit price: Ksh {data.item.price}
          </Text>
          <View>
            <Text className="text-gray-500 text-[11px]">
              Total price: Ksh {data.item.product?.price * data.item.quantity}
            </Text>
            {/* quantity table */}
            <View className="absolute bottom-[-0px] left-[145px] w-[300px] h-[60px]">
              <TouchableOpacity className="relative top-[-25px] left-[72px] bg-green-400 items-center justify-center w-[40px] rounded-full">
                <Text
                  className="text-black text-[11px] py-1"
                  style={styles.customFont}>
                  {data.item.product.kgs} kgs
                </Text>
              </TouchableOpacity>

              <Input
                w={{
                  base: '38%',
                  md: '25%',
                }}
                h={{
                  base: '55%',
                  md: '25%',
                }}
                className="text-black text-[14px]"
                value={data.item.quantity.toString()} // convert the value to a string before passing it to the Input component
                colorScheme={'gray'}
                InputLeftElement={
                  <TouchableOpacity
                    className=" h-full w-[37px] items-center justify-center border-r border-gray-300"
                    onPress={() =>
                      updateQuantityCart({
                        productId: data.item.product._id,
                        quantity: data.item.quantity - 1,
                      })
                    }>
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
                    onPress={() =>
                      updateQuantityCart({
                        productId: data.item.product._id,
                        quantity: 1 + data.item.quantity,
                      })
                    }>
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
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHiddenItem = data => (
    <View className="flex flex-row justify-between px-2 relative top-[55px]">
      <TouchableOpacity
        onPress={() => alert('coming soon')}
        className=" h-[100px] relative top-[-50px]">
        <LottieView
          source={require('../../assets/delete.json')}
          autoPlay
          loop
          width={100}
          height={100}
        />
        <Text className="text-green-500 absolute top-[80px] left-[14px] text-[10px]">
          Move to Wishlist
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => removeCartItem(data.item.product._id)}
        className=" h-[70px] relative top-[-20px] w-[70px] Z-[999]">
        <LottieView
          source={require('../../assets/delete.json')}
          autoPlay
          loop
          width={50}
          height={50}
        />
        <Text className="text-black relative top-[45px] left-[15px]">Del</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="bg-gray-100 mb-[198px]">
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Clear cart</AlertDialog.Header>
          <AlertDialog.Body>
            You are about to clear your cart. This action is irreversible and
            will remove all items from your cart. Please take a moment to review
            your cart contents before proceeding.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}>
                Cancel
              </Button>
              <Button
                colorScheme="danger"
                onPress={() => {
                  clearCart();
                  setTimeout(() => {
                    onClose();
                  }, 1000);
                }}>
                Proceed
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>

      <View className="flex flex-row justify-between items-center p-4 bg-white mb-1">
        <View className="flex flex-row space-x-4 items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FastImage source={icons.backarrow} className="w-[25px] h-[25px]" />
          </TouchableOpacity>

          <Text
            className="text-black font-bold text-[19px]"
            style={styles.customFont}>
            Cart
          </Text>
        </View>

        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
          <FastImage
            source={icons.delete_icon}
            resizeMode="contain"
            className="w-[20px] h-[20px]"
            tintColor={'black'}
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="h-[100px] absolute top-[53%] left-[33%] z-[999]">
          <LottieView
            source={require('../../assets/dots.json')}
            autoPlay
            loop
            width={120}
            height={120}
          />
        </View>
      ) : null}

      {listData?.length > 0 ? (
        <View className="z-[40] h-full">
          <SwipeListView
            data={listData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-100}
            leftOpenValue={100}
            disableRightSwipe={true}
            onSwipeValueChange={onSwipeValueChange}
          />
          <View className="bg-white absolute top-[76vh] h-[120px] w-full z-[999] px-2">
            <Divider className="mb-4" />
            <View className="flex flex-row justify-between">
              <View className="relative top-[-10px]">
                <Text
                  className="text-black text-[12px]"
                  style={styles.customFont}>
                  Discount customer? enter amount.
                </Text>
                <View className="border border-dotted w-[85px] mt-2">
                  <Input
                    InputLeftElement={
                      <View className="ml-2">
                        <FastImage
                          source={icons.scissors}
                          className="w-[15px] h-[20px]"
                          resizeMode="contain"
                        />
                      </View>
                    }
                    h={7}
                    variant="unstyled"
                    placeholder="amount"
                  />
                </View>
              </View>
              <View className="flex flex-row items-center space-x-2 mt-4.5">
                <View className="flex flex-row items-center space-x-2">
                  <Text className="text-black">Total:</Text>
                  <Text className="text-black">
                    {Math.ceil(total).toLocaleString()}
                  </Text>
                </View>
                <Button colorScheme={'green'} className="w-[100px]">
                  Checkout
                </Button>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View className="h-full  w-full justify-center items-center">
          <LottieView
            source={require('../../assets/emptycart.json')}
            autoPlay
            loop
            width={250}
            height={250}
            className="relative top-[0vh]"
          />
          <Text
            className="text-black relative top-[-1vh] text-[12px] mx-3 text-center"
            style={styles.customFont}>
            No records were found associated with your cart in our servers.
            Please proceed to add products to start populating your cart and
            view your selected items.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = {
  rowFront: {
    backgroundColor: '#FFF',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
    paddingLeft: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
  },
  customFont: {
    fontFamily: 'serif',
  },
};

export default Cart;
