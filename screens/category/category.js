import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, RefreshControl, FlatList, StyleSheet} from 'react-native';
import {Fab, ProductCard} from '../../components';
import axios from 'axios';
import {base_url} from '../../utils/baseUrl';
import {useFocusEffect} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import CategoryModal from './Modal';

const Category = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [pressedId, setPressedId] = useState('');
  const [gasTitle, setGasTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await axios.get(`${base_url}products?sort=createdAt`);
      setProducts(res.data.data);
      setRefreshing(false);

      // console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProducts();
    }, [navigation]),
  );

  // console.log(pressedId);

  return (
    <View className="flex-1">
      <Fab navigation={navigation} />

      {modalVisible && (
        <CategoryModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          pressedId={pressedId}
          gasTitle={gasTitle}
          navigation={navigation}
          getProducts={getProducts}
        />
      )}

      {products?.length > 0 ? (
        <View>
          <FlatList
            data={products}
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
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['red', 'green', 'blue', 'orange']}
                style={{backgroundColor: 'transparent'}}
                tintColor="transparent" //iso
              />
            }
            ListHeaderComponent={
              <>
                <View className="h-[28vh] bg-white">
                  <View className="w-screen  relative top-[-40px]">
                    <LottieView
                      source={require('../../assets/gasstation.json')}
                      autoPlay
                      loop
                      width={400}
                      height={350}
                    />
                    <View className="relative top-[50px] flex flex-row items-center justify-between mx-4">
                      <Text
                        className="text-black  text-[20px] font-bold"
                        style={styles.customFont}>
                        Gas Station
                      </Text>
                      <View>
                        <Text
                          className="text-black  text-[15px] font-bold"
                          style={styles.customFont}>
                          Total units:{' '}
                          {products.reduce(
                            (acc, curr) => acc + curr.quantity,
                            0,
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </>
            }
            renderItem={({item}, props) => {
              return (
                <>
                  <View className="bg-white mt-1 rounded-[5px] w-[49.4%]">
                    <ProductCard
                      product={item}
                      navigation={navigation}
                      setPressedId={setPressedId}
                      setModalVisible={setModalVisible}
                      setGasTitle={setGasTitle}
                    />
                  </View>
                </>
              );
            }}
            ListFooterComponent={
              <>
                <View></View>
              </>
            }
          />
        </View>
      ) : (
        <View className="bg-white w-screen h-screen ">
          <LottieView
            source={require('../../assets/gas.json')}
            autoPlay
            loop
            width={390}
            height={350}
            className="absolute top-[10vh]"
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

export default Category;
