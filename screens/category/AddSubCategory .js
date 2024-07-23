import {
  Button,
  CheckIcon,
  Checkbox,
  FormControl,
  Input,
  Select,
  TextArea,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../productDetails/Header';
import axios from 'axios';
import {base_url} from '../../utils/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import {useToast} from 'react-native-toast-notifications';
import {icons} from '../../constants';
import FastImage from 'react-native-fast-image';
import config from '../../utils/axiosconfig';

const AddSubCategory = ({navigation, route}) => {
  const toast = useToast();
  const {product} = route.params;

  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [disable, setDisable] = useState(false);
  const [kgs, setkgs] = useState('');
  const [loading, setLoading] = useState(false);

  const subCategoryData = {
    title: product.title,
    price,
    quantity,
    productId: product._id,
    icon: product.images[0].url,
    kgs,
  };

  console.log(subCategoryData);

  const AddSubNewCategory = async token => {
    setDisable(true);
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const res = await api.post('/categories', subCategoryData);
      if (res.data.message === 'Category added to product') {
        toast.show('Success', {
          type: 'success',
          placement: 'top',
          duration: 2000,
          offset: 30,
          animationType: 'slide-in',
        });
        setDisable(false);
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
      }

      console.log(res);
    } catch (err) {
      // console.log(err.code);
      if (err.message === 'Request failed with status code 409') {
        toast.show('Category already exists, Duplicate products found!', {
          type: 'danger',
          placement: 'top',
          duration: 10000,
          offset: 30,
          animationType: 'slide-in',
        });
        setDisable(false);
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
        setTimeout(() => {
          navigation.goBack();
        }, 3000);
      }
    }
  };

  const handleSubmit = async () => {
    if (price.length < 1 || quantity.length < 1 || kgs.length < 1) {
      return toast.show('Please fill all fields!', {
        type: 'danger',
        placement: 'top',
        duration: 2000,
        offset: 30,
        animationType: 'slide-in',
      });
    }

    // Retrieving token
    try {
      const token = await AsyncStorage.getItem('token');
      AddSubNewCategory(token);
    } catch (error) {
      console.log('Error retrieving token:', error);
    }
  };

  // console.log(categoryData);

  const handlePriceChange = value => {
    setPrice(value);
  };
  const handlekgsChange = value => {
    setkgs(value);
  };

  const handleQuantityChange = value => {
    setQuantity(value);
  };

  return (
    <View className="bg-white h-screen w-screen">
      <Header navigation={navigation} title="Add Sub-Category" />
      <View className="relative top-[0px] ">
        <View className="flex items-center space-y-2">
          <FastImage
            source={icons.EvabamarLogo}
            resizeMode="contain"
            className="w-[150px] h-[150px]"
            // tintColor={'gree'}
            alt="logo"
          />
        </View>
      </View>

      <View className="shadow-lg shadow-slate-500 bg-white mx-2 rounded-lg ">
        <VStack space={3} marginTop={3} marginX={5}>
          <FormControl mt="3">
            <FormControl.Label>
              <Text className="text-black font-bold" style={styles.customFont}>
                Price
              </Text>
            </FormControl.Label>
            <Input
              inputMode="numeric"
              placeholder="1500"
              value={price}
              onChangeText={handlePriceChange}
              borderColor="green.600"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>
              <Text className="text-black font-bold" style={styles.customFont}>
                Kgs
              </Text>
            </FormControl.Label>
            <Input
              inputMode="numeric"
              placeholder="6"
              value={kgs}
              onChangeText={handlekgsChange}
              borderColor="green.600"
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>
              <Text className="text-black font-bold" style={styles.customFont}>
                Quantity
              </Text>
            </FormControl.Label>
            <Input
              inputMode="numeric"
              placeholder="15"
              value={quantity}
              onChangeText={handleQuantityChange}
              borderColor="green.600"
            />
          </FormControl>
          <View className="relative top-2">
            <Checkbox
              shadow={2}
              value="test"
              colorScheme={'green'}
              accessibilityLabel="This is a dummy checkbox"
              defaultIsChecked>
              I accept the terms & conditions
            </Checkbox>
          </View>

          <TouchableOpacity
            disabled={disable}
            className="pb-[25px] mt-2"
            onPress={() => {
              handleSubmit();
            }}>
            <Button
              mt={2}
              className="bg-green-600 text-white"
              style={styles.customFont}
              disabled={true}>
              <View>
                {disable ? (
                  <View className="bg-red-600 h-[20px] relative left-[-50px] top-[-14px] ">
                    <LottieView
                      source={require('../../assets/Evabamar.json')}
                      autoPlay
                      loop
                      width={100}
                      height={50}
                    />
                  </View>
                ) : (
                  <Text
                    style={styles.customFont}
                    className="text-white font-bold text-[16px]">
                    Submit
                  </Text>
                )}
              </View>
            </Button>
          </TouchableOpacity>
        </VStack>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
});

export default AddSubCategory;
