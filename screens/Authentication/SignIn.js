import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {icons} from '../../constants';
import {VStack, Box, Center, FormControl, Input, Button} from 'native-base';
import FastImage from 'react-native-fast-image';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');

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

  const styles = StyleSheet.create({
    customFont: {
      fontFamily: 'serif',
    },
  });

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
                        {!showPassword ? (
                          <TouchableOpacity onPress={handleShowPassword}>
                            <Image
                              source={icons.user}
                              onPress={handleShowPassword}
                              className="w-[25px] h-[20px] ml-[8px]"
                              style={{tintColor: 'black'}}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity onPress={handleShowPassword}>
                            <Image
                              source={icons.eye_close}
                              onPress={handleShowPassword}
                              className="w-[20px] h-[20px] mr-[10px]"
                              style={{tintColor: 'black'}}
                            />
                          </TouchableOpacity>
                        )}
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
                            className="w-[20px] h-[20px] mr-[10px]"
                            style={{tintColor: 'black'}}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  }
                />
              </FormControl>
              <TouchableOpacity>
                <Button
                  mt={2}
                  className="bg-green-600 text-white font-bold"
                  onPress={() => navigation.navigate('DrawerNav')}
                  style={styles.customFont}>
                  <Text
                    style={styles.customFont}
                    className="text-white font-bold text-[16px]">
                    Log in
                  </Text>
                </Button>
              </TouchableOpacity>
            </VStack>
          </Box>
        </Center>
      </View>
    </View>
  );
};

export default SignIn;
