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
import React, {useEffect, useState} from 'react';
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

const EditCategory = ({navigation, route}) => {
  const toast = useToast();
  const {id} = route.params;

  const [title, setTitle] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const categoryData = {
    title,
    description,
    price: priceRange,
    quantity,
    images: [
      {
        url: imageUrl,
      },
    ],
  };

  const getProduct = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${base_url}products/${id}`);
      const {title, price, images, quantity, description} =
        res.data.findProduct;
      setTitle(title);
      setPriceRange(price);
      setImageUrl(images[0].url);
      setQuantity(quantity.toString());
      setDescription(description);
      setLoading(false);

      console.log(quantity);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const EditCategory = async token => {
    setDisable(true);
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const res = await api.patch(`/products/${id}`, categoryData);
      console.log(res);
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
    } catch (err) {}
  };

  const handleSubmit = async () => {
    if (
      title.length < 1 ||
      priceRange.length < 1 ||
      quantity.length < 1 ||
      imageUrl.length < 1 ||
      description.length < 1
    ) {
      toast.show('Please fill all fields!', {
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
      EditCategory(token);
    } catch (error) {
      console.log('Error retrieving token:', error);
    }
  };

  console.log(id);

  const handlePriceRangeChange = value => {
    setPriceRange(value);
  };

  const handleImageUrlChange = value => {
    setImageUrl(value);
  };

  const handleQuantityChange = value => {
    setQuantity(value);
  };

  const handleDescriptionChange = value => {
    setDescription(value);
  };

  return (
    <View className="bg-white h-screen w-screen">
      <Header navigation={navigation} title="Edit Category" />
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
        <VStack space={1.5} marginTop={3} marginX={5}>
          <FormControl mt="3">
            <FormControl.Label>
              <Text className="text-black font-bold" style={styles.customFont}>
                Price Range
              </Text>
            </FormControl.Label>
            <Input
              placeholder="1500 to 8000"
              value={priceRange}
              onChangeText={handlePriceRangeChange}
              borderColor="green.600"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>
              <Text className="text-black font-bold" style={styles.customFont}>
                Image url
              </Text>
            </FormControl.Label>
            <Input
              placeholder="https://marketplace.flexpay.co.ke/1.jpg"
              value={imageUrl}
              onChangeText={handleImageUrlChange}
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
          <FormControl mt="3">
            <FormControl.Label>
              <Text className="text-black font-bold" style={styles.customFont}>
                Description
              </Text>
            </FormControl.Label>
            <TextArea
              h={20}
              placeholder="Total Gas is a popular brand of cooking gas available in Kenya."
              w="100%"
              maxW="400"
              value={description}
              onChangeText={handleDescriptionChange}
              borderColor={'green.600'}
              //   className="border rounded-sm border-green-500"
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

      {loading && (
        <View className="bg-transparent w-screen h-screen absolute">
          <LottieView
            source={require('../../assets/gas.json')}
            autoPlay
            loop
            width={390}
            height={350}
            className="absolute top-[13vh]"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
});

export default EditCategory;
