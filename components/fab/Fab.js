import {
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useReducer, useState} from 'react';
import Colors from '../../constants/Colors';
import Icon, {Icons} from '../../components/Icons';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  log,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import {COLORS, icons} from '../../constants';
import {Text} from 'react-native-svg';
const plus = require('../../assets/plus.json');
const cart = require('../../assets/cart.json');
const del = require('../../assets/delete.json');

const {width} = Dimensions.get('window');
import LottieView from 'lottie-react-native';

const FAB_SIZE = 54;
const circleScale = (width / FAB_SIZE).toFixed(1);
const circleSize = circleScale * FAB_SIZE;
const dist = circleSize / 2 - FAB_SIZE;
const middleDist = dist / 1.41;

const ActionButton = ({icon, style, onPress, width2, height2 = () => {}}) => {
  return (
    <Animated.View style={[styles.actionBtn, style]}>
      <TouchableOpacity
        underlayColor={Colors.yellow}
        style={styles.actionBtn}
        onPress={onPress}>
        <LottieView
          source={icon}
          autoPlay
          loop
          width={width2}
          height={height2}
          className="relative top-[-0px]"
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function Fab({navigation}) {
  const [open, toggle] = useReducer(s => !s, false);

  const rotation = useDerivedValue(() => {
    return withTiming(open ? '0deg' : '180deg');
  }, [open]);

  const progress = useDerivedValue(() => {
    return open ? withSpring(1) : withSpring(0);
  });

  const translation = useDerivedValue(() => {
    return open ? withSpring(1, {stiffness: 80, damping: 8}) : withSpring(0);
  });

  const fabStyles = useAnimatedStyle(() => {
    const rotate = rotation.value;
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.red, Colors.darkRed],
    );
    return {
      transform: [{rotate}],
      backgroundColor,
    };
  });

  const scalingStyles = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [0, circleScale]);
    return {
      transform: [{scale}],
    };
  });

  const translationStyles = (x, y, value) =>
    useAnimatedStyle(() => {
      const translate = interpolate(translation.value, [0, 1], [0, -value], {
        extrapolateLeft: Extrapolate.CLAMP,
      });
      const scale = interpolate(progress.value, [0, 1], [0, 1], {
        extrapolateLeft: Extrapolate.CLAMP,
      });
      if (x && y) {
        return {
          transform: [
            {translateX: translate},
            {translateY: translate},
            {scale},
          ],
        };
      } else if (x) {
        return {
          transform: [{translateX: translate}, {scale}],
        };
      } else {
        return {
          transform: [{translateY: translate}, {scale}],
        };
      }
    });
  return (
    <View className="absolute z-[999] bottom-[0px] right-[0px]">
      <View style={styles.fabContainer}>
        <Animated.View style={[styles.expandingCircle, scalingStyles]} />
        <TouchableWithoutFeedback onPress={toggle}>
          <Animated.View style={[styles.fab, fabStyles]}>
            <FastImage
              source={icons.plus}
              className="w-[25px] h-[25px]"
              tintColor={COLORS.green}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
        <ActionButton
          style={translationStyles(false, true, dist)}
          icon={plus}
          width2={90}
          height2={90}
          onPress={() => {
            navigation.navigate('AddCategory'), toggle();
          }}
        />

        <ActionButton
          style={translationStyles(true, true, middleDist)}
          icon={del}
          width2={40}
          height2={40}
        />
        <ActionButton
          style={translationStyles(true, false, dist)}
          icon={cart}
          width2={90}
          height2={90}
        />
      </View>
    </View>
  );
}

const CircleStyle = {
  width: FAB_SIZE,
  height: FAB_SIZE,
  borderRadius: FAB_SIZE / 2,
  justifyContent: 'center',
  alignItems: 'center',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.accent,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  fab: {
    ...CircleStyle,
    backgroundColor: Colors.green2,
    transform: [{rotate: '180deg'}],
  },
  expandingCircle: {
    ...CircleStyle,
    // transform: [{ scale: 8 }],
    backgroundColor: Colors.green,
    position: 'absolute',
    zIndex: -1,
  },
  actionBtn: {
    ...CircleStyle,
    backgroundColor: Colors.pink,
    position: 'absolute',
    zIndex: -1,
  },
});
