import React from 'react';
const {default: Animated} = require('react-native-reanimated');
import {
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
const FAB_SIZE = 54;

const ActionButton = ({icon, style, onPress = () => {}}) => {
  return (
    <Animated.View style={[styles.actionBtn, style]}>
      <TouchableHighlight
        underlayColor={'red'}
        style={styles.actionBtn}
        onPress={onPress}>
        {/* <Icon type={Icons.EvilIcons} name={icon} size={34} color={Colors.white} /> */}
      </TouchableHighlight>
    </Animated.View>
  );
};

const CircleStyle = {
  width: FAB_SIZE,
  height: FAB_SIZE,
  borderRadius: FAB_SIZE / 2,
  justifyContent: 'center',
  alignItems: 'center',
};

const styles = StyleSheet.create({
  actionBtn: {
    ...CircleStyle,
    backgroundColor: 'yellow',
    position: 'absolute',
    zIndex: -1,
  },
});

export default ActionButton;
