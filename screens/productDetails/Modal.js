import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button, FlatList, Input} from 'native-base';
import {useToast} from 'react-native-toast-notifications';
import axios from 'axios';
import {base_url} from '../../utils/baseUrl';
import config from '../../utils/axiosconfig';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubCategoryModal = ({
  setModalVisible,
  modalVisible,
  pressedId,
  gasTitle,
  navigation,
  getProducts,
  gaskgs,
  product,
}) => {
  const {width, height} = Dimensions.get('window');
  const toast = useToast();
  const [disable, setDisable] = useState(false);

  const DeleteCategory = async () => {
    setDisable(true);
    try {
      const token = await AsyncStorage.getItem('token');

      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const res = await api.delete(`/products/${pressedId}`);

      if (res.data.message === 'Product deleted successfully') {
        toast.show('Success', {
          type: 'success',
          placement: 'top',
          duration: 2000,
          offset: 30,
          animationType: 'slide-in',
        });
        getProducts();
        setDisable(false);
        setModalVisible(false);
      }
      console.log(res.data);

      //   setTimeout(() => {
      //     navigation.goBack();
      //   }, 1500);
    } catch (err) {}
  };

  //animation

  const DeleteSingleCategory = async () => {
    setDisable(true);
    try {
      const token = await AsyncStorage.getItem('token');

      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const res = await api.delete(`/categories/${pressedId}`);

      if (res.data.message === 'category deleted successfully') {
        toast.show('Success', {
          type: 'success',
          placement: 'top',
          duration: 2000,
          offset: 30,
          animationType: 'slide-in',
        });

        setDisable(false);
        setModalVisible(false);
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
      }
      // console.log(res.data);
    } catch (err) {}
  };

  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (modalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [modalVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height + 100, height - 170],
  });

  return (
    <Modal transparent={true} visible={modalVisible} animationType="fade">
      <View
        className="bg-white flex-1"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
        {/* transparent background */}
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
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
          <View className="flex flex-row space-x-3 justify-center my-2">
            <Text className="text-black text-[16px] font-bold">
              {gaskgs}Kgs, {gasTitle} gas
            </Text>
            <Text className="text-black text-[16px] font-bold">
              ({pressedId})
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditSubCategory', {
                  id: pressedId,
                  product,
                }),
                  setModalVisible(false);
              }}>
              <Button
                mt={2}
                className="bg-green-600 text-white"
                style={styles.customFont}
                disabled={true}>
                <Text
                  style={styles.customFont}
                  className="text-white font-bold text-[17px]">
                  Edit
                </Text>
              </Button>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                DeleteSingleCategory();
              }}>
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
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
});

export default SubCategoryModal;
