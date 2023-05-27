import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  StyleSheet,
} from 'react-native';
import {icons, images} from '../../constants';
import Recommended from './Recommended';

const Account = ({navigation}) => {
  const styles = StyleSheet.create({
    customFont: {
      fontFamily: 'serif',
    },
    customColor: {
      color: '#e52e04',
    },
  });
  return (
    <View className="bg-gray-100 mt-[400px]">
      <Text style={styles.customFont} className="text-center text-black">
        coming soon
      </Text>
    </View>
  );
};

export default Account;
