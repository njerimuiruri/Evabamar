import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {icons} from '../../constants';
import {VStack, Box, Center, FormControl, Input, Button} from 'native-base';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import {base_url} from '../../utils/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import {useToast} from 'react-native-toast-notifications';

const SignIn = ({navigation}) => {
  const toast = useToast();

  const [disable, setDisable] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');

  const user = {email, password};

  const handleEmailChange = value => {
    setEmail(value);
    if (value.trim() === '') {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError('Email is invalid');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = value => {
    setPassword(value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Storing token
  const storeToken = async token => {
    try {
      await AsyncStorage.setItem('token', token);
      console.log('Token stored successfully.');
    } catch (error) {
      console.log('Error storing token:', error);
    }
  };

  // Retrieving token
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
    } catch (error) {
      console.log('Error retrieving token:', error);
    }
  };

  const loginUser = async () => {
    setDisable(true);

    try {
      const res = await axios.post(`${base_url}user/login`, user);
      console.log(res);

      if (
        res.data.message ===
        'Operation `users.findOne()` buffering timed out after 10000ms'
      ) {
        return (
          toast.show('Error connecting to database!', {
            type: 'danger',
            placement: 'top',
            duration: 5000,
            offset: 30,
            animationType: 'slide-in',
          }),
          setDisable(false)
        );
      }

      if (res.status === 200) {
        const {token} = res.data;
        storeToken(token);
        getToken();
        setDisable(false);
        toast.show('Success', {
          type: 'success',
          placement: 'top',
          duration: 2000,
          offset: 30,
          animationType: 'slide-in',
        });
        navigation.navigate('DrawerNav');
      }
    } catch (err) {
      console.log(err);
      if (err.response.data === 'Wrong email!') {
        toast.show('Wrong email', {
          type: 'danger',
          placement: 'top',
          duration: 2000,
          offset: 30,
          animationType: 'slide-in',
        });
        setDisable(false);
      }
      if (err.response.data === 'Wrong password!') {
        toast.show('Wrong password', {
          type: 'danger',
          placement: 'top',
          duration: 2000,
          offset: 30,
          animationType: 'slide-in',
        });
        setDisable(false);
      }
    }
  };

  return (
    <View style={{backgroundColor: '#FFFFFF', height: '100%'}}>
      <View>
        <Center style={{backgroundColor: '#FFFFFF'}} className="relative">
          <View className="absolute top-[40px] ">
            <View className="flex items-center space-y-2">
              <FastImage
                source={icons.EvabamarLogo}
                resizeMode="contain"
                className="w-[280px] h-[220px]"
                // tintColor={'gree'}
                alt="logo"
              />
            </View>
          </View>
          <Box
            border="1"
            borderRadius="2xl"
            className="h-[45vh] w-[90%] bg-white relative top-[35vh] shadow-lg shadow-slate-500">
            <VStack space={8} marginTop={9} marginX={7}>
              <FormControl isRequired isInvalid={emailError !== ''}>
                <>
                  <FormControl.Label>
                    <Text
                      className="text-black font-bold"
                      style={styles.customFont}>
                      Email
                    </Text>
                  </FormControl.Label>
                  <Input
                    placeholder={'Enter your email'}
                    onChangeText={handleEmailChange}
                    value={email}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    className="text-black text-[14px]"
                    borderColor="green.600"
                    InputLeftElement={
                      <View>
                        <TouchableOpacity onPress={handleShowPassword}>
                          <Image
                            source={icons.user}
                            onPress={handleShowPassword}
                            className="w-[25px] h-[20px] ml-[8px]"
                            style={{tintColor: 'black'}}
                          />
                        </TouchableOpacity>
                      </View>
                    }
                  />
                  <View className=" items-end ">
                    <View>
                      {emailError !== '' && (
                        <FormControl.ErrorMessage>
                          <Text className="">{emailError}</Text>
                        </FormControl.ErrorMessage>
                      )}
                    </View>
                  </View>
                </>
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label>
                  <Text
                    className="text-black font-bold"
                    style={styles.customFont}>
                    Password
                  </Text>
                </FormControl.Label>
                <Input
                  placeholder="Enter your password"
                  onChangeText={handlePasswordChange}
                  value={password}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  returnKeyType="done"
                  borderColor="green.600"
                  className="text-black text-[14px]"
                  InputLeftElement={
                    <View>
                      {!showPassword ? (
                        <TouchableOpacity onPress={handleShowPassword}>
                          <Image
                            source={icons.eye}
                            onPress={handleShowPassword}
                            className="w-[20px] h-[20px] ml-[10px]"
                            style={{tintColor: 'black'}}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity onPress={handleShowPassword}>
                          <Image
                            source={icons.eye_close}
                            onPress={handleShowPassword}
                            className="w-[20px] h-[20px] ml-[10px]"
                            style={{tintColor: 'black'}}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  }
                />
              </FormControl>
              <TouchableOpacity onPress={() => loginUser()} disabled={disable}>
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
                        Log in
                      </Text>
                    )}
                  </View>
                </Button>
              </TouchableOpacity>
            </VStack>
          </Box>
        </Center>
      </View>
    </View>
  );
};
// evabamar@gmail.com
const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
});

export default SignIn;
