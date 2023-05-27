import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {icons, images} from '../../constants';
import {
  VStack,
  Box,
  Divider,
  Center,
  FormControl,
  Input,
  Button,
  Checkbox,
  HStack,
  Pressable,
} from 'native-base';
import CountryPicker, {FlagButton} from 'react-native-country-picker-modal';
import FastImage from 'react-native-fast-image';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmail, setisEmail] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [countryCode, setCountryCode] = useState('US'); // Set the default country code

  const handleNameChange = value => {
    setName(value);
  };

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

  const onSelect = country => {
    setCountryCode(country.cca2);
  };

  const handlePhoneNumberChange = value => {
    setPhoneNumber(value);
    if (value.trim() === '') {
      setPhoneNumberError('Phone number is required');
    } else if (!/^(0|7)[0-9]{8}$/.test(value)) {
      setPhoneNumberError('Phone number is invalid');
    } else {
      setPhoneNumberError('');
    }
  };

  const handlePasswordChange = value => {
    setPassword(value);
    if (confirmPassword !== '' && confirmPassword !== value) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleConfirmPasswordChange = value => {
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowLoginMethod = () => {
    setisEmail(!isEmail);
  };

  const handleSignUp = () => {
    // Perform sign up action
  };

  const isEnableSignUp = () => {
    return (
      name !== '' &&
      ((email !== '' && emailError === '') ||
        (phoneNumber !== '' && phoneNumberError === '')) && // check if either email or phone number is not empty and does not have errors
      password !== '' &&
      confirmPassword !== '' &&
      confirmPassword === password // check if passwords match
    );
  };

  const styles = StyleSheet.create({
    customFont: {
      fontFamily: 'serif',
    },
  });

  return (
    <View style={{backgroundColor: '#FFFFFF', height: '100%'}}>
      <View>
        <View style={{height: '35%'}}>
          <ImageBackground
            source={images.background_01}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          />
        </View>

        <Center style={{backgroundColor: '#FFFFFF'}} className="relative">
          <View className="relative top-[-250px] ">
            <View className="absolute w-[90vw] top-[0px] ">
              <View className="flex items-center space-y-2 justify-center">
                <FastImage
                  source={icons.SwiftMartlogo1}
                  resizeMode="contain"
                  className="w-[150px] h-[120px]"
                  // tintColor={'gree'}
                  alt="logo"
                />
                <Text
                  className="text-white font-sans font-bold text-[16px]"
                  style={styles.customFont}>
                  Join SwiftMart
                </Text>
              </View>
            </View>
            <Box
              className="h-[63vh] w-[90vw] bg-white relative top-[16vh] shadow-lg shadow-slate-500"
              border="1"
              borderRadius="2xl">
              <VStack space={3} marginTop={5} marginX={7}>
                <FormControl isRequired>
                  <FormControl.Label>
                    <Text
                      className="text-red-600 font-bold"
                      style={styles.customFont}>
                      Name
                    </Text>
                  </FormControl.Label>
                  <Input
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={handleNameChange}
                    className="text-black text-[14px]"
                    borderColor="red.600"
                  />
                </FormControl>

                <FormControl isRequired isInvalid={emailError !== ''}>
                  {isEmail ? (
                    <>
                      <FormControl.Label>
                        <Text
                          className="text-red-600 font-bold"
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
                        borderColor="red.600"
                      />
                      <View className="flex flex-row items-center justify-between ">
                        <View>
                          {emailError !== '' && (
                            <FormControl.ErrorMessage>
                              <Text className="">{emailError}</Text>
                            </FormControl.ErrorMessage>
                          )}
                        </View>

                        <TouchableOpacity
                          onPress={handleShowLoginMethod}
                          className="relative  top-[3px] ">
                          <Text
                            className="text-red-600 italic text-[13px] mt-1 underline text-right"
                            style={styles.customFont}>
                            or, Phone number
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    <FormControl isRequired isInvalid={phoneNumberError !== ''}>
                      <FormControl.Label>
                        <Text
                          className="text-red-600 font-bold"
                          style={styles.customFont}>
                          Phone Number
                        </Text>
                      </FormControl.Label>
                      <Input
                        placeholder="Enter your phone number"
                        onChangeText={handlePhoneNumberChange}
                        value={phoneNumber}
                        keyboardType="numeric"
                        returnKeyType="done"
                        borderColor="red.600"
                        className="text-black text-[14px]"
                        InputLeftElement={
                          <View>
                            <CountryPicker
                              countryCode={countryCode}
                              withFilter
                              withFlag
                              withCountryNameButton={false} // Set withCountryNameButton to false
                              withAlphaFilter
                              withCallingCode={true}
                              withEmoji
                              onSelect={onSelect}
                              visible={false}
                              renderFlagButton={() => (
                                <View className="flex flex-row items-center ml-[5px]">
                                  <FlagButton countryCode="KE" withEmoji />
                                  <Text className="text-red-600 font-semibold">
                                    +254
                                  </Text>
                                </View>
                              )}
                            />
                          </View>
                        }
                      />

                      <View className="flex flex-row items-center justify-between ">
                        <View>
                          {phoneNumberError !== '' && (
                            <FormControl.ErrorMessage>
                              {phoneNumberError}
                            </FormControl.ErrorMessage>
                          )}
                        </View>

                        <TouchableOpacity
                          onPress={handleShowLoginMethod}
                          className="relative top-[3px]">
                          <Text
                            className="text-red-600 italic text-[13px] mt-1 underline text-right"
                            style={styles.customFont}>
                            or, Email
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </FormControl>
                  )}
                </FormControl>

                <FormControl isRequired>
                  <FormControl.Label>
                    <Text
                      className="text-red-600 font-bold"
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
                    borderColor="red.600"
                    className="text-black text-[14px]"
                    InputRightElement={
                      <View>
                        {!showPassword ? (
                          <TouchableOpacity onPress={handleShowPassword}>
                            <Image
                              source={icons.eye}
                              onPress={handleShowPassword}
                              className="w-[20px] h-[20px] mr-[10px]"
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

                <FormControl isRequired className="pb-[10px]">
                  <FormControl.Label>
                    <Text
                      className="text-red-600 font-bold"
                      style={styles.customFont}>
                      Confirm Password
                    </Text>
                  </FormControl.Label>
                  <Input
                    placeholder="Confirm password"
                    onChangeText={handlePasswordChange}
                    value={password}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    returnKeyType="done"
                    borderColor="red.600"
                    className="text-black text-[14px]"
                    InputRightElement={
                      <View>
                        {!showPassword ? (
                          <TouchableOpacity onPress={handleShowPassword}>
                            <Image
                              source={icons.eye}
                              onPress={handleShowPassword}
                              className="w-[20px] h-[20px] mr-[10px]"
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

                <View>
                  <View className="pb-1">
                    <Checkbox
                      shadow={2}
                      value="danger"
                      colorScheme="danger"
                      defaultIsChecked>
                      <View className="flex-row items-center">
                        <Text
                          className="text-black font-serif text-[12px]"
                          style={styles.customFont}>
                          I agree to{' '}
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            console.log('Terms and Conditions pressed')
                          }>
                          <Text
                            className="text-red-500 underline font-serif text-[12px]"
                            style={styles.customFont}>
                            Terms and Conditions
                          </Text>
                        </TouchableOpacity>
                        <Text className="text-black text-[12px]"> & </Text>
                        <TouchableOpacity
                          onPress={() => console.log('Privacy Policy pressed')}>
                          <Text
                            className="text-red-500 underline font-serif text-[12px]"
                            style={styles.customFont}>
                            Privacy Policy
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </Checkbox>
                  </View>

                  <TouchableOpacity>
                    <Button
                      mt={2}
                      colorScheme="red"
                      // onPress={handleSignIn}
                      disabled={false}>
                      <Text
                        style={styles.customFont}
                        className="text-white font-bold text-[16px]">
                        Sign up
                      </Text>
                    </Button>
                  </TouchableOpacity>

                  <View className="flex space-x-2 flex-row justify-center items-center mt-[15px]">
                    <Text
                      className="text-black text-[13px]"
                      style={styles.customFont}>
                      Already have an account?
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.replace('SignIn')}>
                      <Text
                        className="text-red-600 font-bold"
                        style={styles.customFont}>
                        Login
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </VStack>
            </Box>
          </View>
        </Center>
      </View>
    </View>
  );
};
export default SignUp;
