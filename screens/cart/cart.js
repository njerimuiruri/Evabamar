import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {base_url} from '../../utils/baseUrl';
import config from '../../utils/axiosconfig';
import {useToast} from 'react-native-toast-notifications';
import {SwipeListView} from 'react-native-swipe-list-view';
import FastImage from 'react-native-fast-image';
import {icons} from '../../constants';
import {Input} from 'native-base';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDIwMDI1ZDJmYWQ2OWIwNzM3MDBhYjgiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODQxNTc2NjAsImV4cCI6MTY4NDI0NDA2MH0.hjMdgn0NCsnc3UW5PgYbZab-w50CEQxey2fXTbZyVNU';

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(1);
  const toast = useToast();

  const [listData, setListData] = useState([]);
  const getCart = async () => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });
      setLoading(true);

      const res = await api.get('/cart');
      console.log(res);
      setListData(res.data.items);
      if (res.data.message == 'Item added to cart successfully') {
        setLoading(false);
        toast.show(`${value} ${selectedColor}  added to cart`, {
          type: 'success',
          placement: 'top',
          duration: 2000,
          offset: 30,
          animationType: 'zoom-in',
        });
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

  const updateQuantityCart = async ({productId, quantity}) => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const res = await api.patch('/cart', {productId, quantity});
      console.log(res);
      setListData(res.data.items);

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

  useEffect(() => {
    // getCart();
    // setListData(data2);
  }, []);

  const onSwipeValueChange = swipeData => {
    const {key, value} = swipeData;
    if (value < -250) {
      // Remove the item from the list
      const newData = [...listData];
      const prevIndex = listData.findIndex(item => item.id === key);
      newData.splice(prevIndex, 1);
      setListData(newData);
    }
  };

  const renderItem = data => (
    <TouchableOpacity
      className="bg-white border-b-[1px] border-gray-100 py-4 px-2 relative"
      activeOpacity={1}>
      <View className="flex flex-row space-x-3 items-center">
        <FastImage
          source={{uri: data.item.product.images[0].url}}
          className="w-[100px] h-[100px]"
          resizeMode="contain"
        />
        <View className="flex space-y-2">
          <Text className="text-[12px] text-black w-[70vw]">
            {data.item.product.description}
          </Text>
          <Text className="text-[13px] text-gray-500 w-[70vw]">
            {data.item.quantity}, {data.item.color}, {data.item.product.title}
          </Text>
          <View>
            <Text className="text-black text-[13px]">
              {data.item.product?.price.toLocaleString()}
            </Text>
            {/* quantity table */}
            <View className="absolute bottom-[-40px] left-[145px] w-[300px] h-[60px]">
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
                    onPress={updateQuantityCart({
                      productId: '6440012f69814a06a6bfa3dc',
                      quantity: 18,
                    })} // call the handlePlusClick function when the plus button is clicked
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
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHiddenItem = data => (
    <View className="flex flex-row justify-between px-2 relative top-[55px]">
      <TouchableOpacity onPress={() => alert('Delete')}>
        <Text className="text-black text-[12px]">Move to wishlist</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert('Edit')}>
        <Text className="text-black text-[12px]">Remove</Text>
      </TouchableOpacity>
    </View>
  );

  // console.log(cartData);
  const handleMinusClick = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const handlePlusClick = () => {
    setValue(value + 1);
  };

  return (
    <View className="bg-gray-100 mt-[400px] items-center justify-center ">
      <Text style={styles.customFont} className="text-center text-black">
        coming soon
      </Text>
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
