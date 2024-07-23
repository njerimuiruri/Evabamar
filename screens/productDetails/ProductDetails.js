import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {base_url} from '../../utils/baseUrl';
import Header from './Header';
import LottieView from 'lottie-react-native';
import {Button} from 'native-base';
import {FilterModal, ProductCard2} from '../../components';
import {useToast} from 'react-native-toast-notifications';
import config from '../../utils/axiosconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SubCategoryModal from './Modal';
import FastImage from 'react-native-fast-image';
import {icons} from '../../constants';
import Alert from './Alert';

const ProductDetails = ({navigation, route}) => {
  const {product} = route.params;
  const toast = useToast();
  const [pressedId, setPressedId] = useState('');
  const [gasTitle, setGasTitle] = useState('');
  const [gaskgs, setGaskgs] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [disable, setDisable] = useState(false);
  const [openAlert, setAlertOpen] = useState(false);

  const DeleteCategory = async () => {
    setDisable(true);
    try {
      const token = await AsyncStorage.getItem('token');

      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const res = await api.delete(`/products/${product._id}`);

      if (
        res.data.message ===
        'Product and associated categories deleted successfully'
      ) {
        toast.show('Success', {
          type: 'success',
          placement: 'top',
          duration: 2000,
          offset: 30,
          animationType: 'slide-in',
        });
        setDisable(false);
        setAlertOpen(false);
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
      } else {
        toast.show('Failed', {
          type: 'danger',
          placement: 'top',
          duration: 5000,
          offset: 30,
          animationType: 'slide-in',
        });
      }

      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="bg-gray-100">
      <Header navigation={navigation} title="Details" />
      <Alert
        openAlert={openAlert}
        setAlertOpen={setAlertOpen}
        title={product.title}
        DeleteCategory={DeleteCategory}
        disable={disable}
      />

      {/* filltermodal */}
      {showFilterModal && (
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          product={product}
        />
      )}

      {modalVisible && (
        <SubCategoryModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          pressedId={pressedId}
          gasTitle={gasTitle}
          gaskgs={gaskgs}
          product={product}
          navigation={navigation}
        />
      )}

      {product.category.length > 0 ? (
        <>
          <FlatList
            data={product.category}
            removeClippedSubviews={true}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              paddingHorizontal: 8,
              alignItems: 'center',
            }}
            keyExtractor={item => `${item._id}`}
            // showsVerticalScrollIndicator={false}

            ListHeaderComponent={
              <>
                <View className="h-[23vh] bg-white">
                  <View className="w-screen  relative top-[-90px]">
                    <LottieView
                      source={require('../../assets/gasstation.json')}
                      autoPlay
                      loop
                      width={400}
                      height={350}
                    />
                  </View>
                </View>
              </>
            }
            renderItem={({item}, props) => {
              return (
                <>
                  <View className="bg-white mt-1 rounded-[5px] w-[49.4%]">
                    <ProductCard2
                      product={item}
                      image={product.images[0].url}
                      navigation={navigation}
                      setPressedId={setPressedId}
                      setGasTitle={setGasTitle}
                      setModalVisible={setModalVisible}
                      setGaskgs={setGaskgs}
                    />
                  </View>
                </>
              );
            }}
            ListFooterComponent={
              <>
                <View className="h-[140px]"></View>
              </>
            }
          />

          <View className="absolute top-[90.5vh] h-[90px] w-full z-[999] bg-white flex flex-row  justify-evenly  items-center">
            <View className="flex flex-row space-x-2">
              <TouchableOpacity
                className="border border-green-500 p-2 rounded-md"
                onPress={() =>
                  navigation.navigate('AddSubCategory', {
                    product,
                  })
                }>
                <FastImage
                  source={icons.plus}
                  className="w-[20px] h-[20px]"
                  tintColor={'green'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                className="border border-red-500 p-2 rounded-md"
                onPress={() => setAlertOpen(!openAlert)}>
                <FastImage
                  source={icons.minus}
                  className="w-[20px] h-[20px]"
                  tintColor={'red'}
                />
              </TouchableOpacity>
            </View>
            {/* part 2  */}
            <View className="border-2 border-green-500  h-[40px] flex flex-row items-center justify-between rounded-full mx-2 w-[70%]">
              <TouchableOpacity
                className="w-[50%]  h-full flex justify-center"
                onPress={() => setShowFilterModal(true)}>
                <Text className=" text-center text-[14px] text-green-500 font-bold">
                  Add To Cart
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="w-[50%] bg-green-500 h-[40px] flex justify-center rounded-r-full"
                onPress={() => {
                  toast.show('Task finished successfully', {
                    type: 'success',
                    placement: 'top',
                    duration: 2000,
                    offset: 30,
                    animationType: 'slide-in',
                  });
                }}>
                <Text className="text-center text-[14px] text-white font-bold">
                  Order Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <View className="bg-white w-screen h-screen ">
          <LottieView
            source={require('../../assets/no-data.json')}
            autoPlay
            loop
            width={390}
            height={350}
            className="absolute top-[5vh]"
          />

          <View className="relative top-[75vh] mx-3">
            <TouchableOpacity
              onPress={() => navigation.navigate('AddSubCategory', {product})}>
              <Button
                mt={2}
                className="bg-green-600 text-white"
                style={styles.customFont}
                disabled={true}>
                <Text
                  style={styles.customFont}
                  className="text-white font-bold text-[17px]">
                  Add
                </Text>
              </Button>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => DeleteCategory()}>
              <Button
                mt={2}
                className="bg-red-500 text-white"
                style={styles.customFont}
                disabled={true}>
                <View>
                  {disable ? (
                    <View className="bg-red-500 h-[20px] relative left-[-50px] top-[-14px] ">
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
                      Delete
                    </Text>
                  )}
                </View>
              </Button>
            </TouchableOpacity>
          </View>
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

export default ProductDetails;
