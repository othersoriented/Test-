import React, { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';
import WheelItem from './WheelItem';
import { calculateWinner } from '../utils/Functions';
import { WHEEL_RADIUS, ANGLE, SECTIONS } from '../utils/Constants';
import styles from '../styles/Styles';

const SpinWheel = () => {
  const spinAnim = useRef(new Animated.Value(0)).current;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      spinAnim.extractOffset();
    },
    onPanResponderMove: (e, gesture) => {
      spinAnim.setValue(gesture.dy / -2);
    },
    onPanResponderRelease: (e, gesture) => {
      if (Math.abs(gesture.dy) > 5) {
        Animated.decay(spinAnim, {
          velocity: gesture.vy,
          deceleration: 0.999,
          useNativeDriver: true,
        }).start(() => {
          calculateWinner(spinAnim);
        });
      } else {
        spinAnim.setValue(0);
      }
    },
  });

  const spinInterpolate = spinAnim.interpolate({
    inputRange: [-360, 0, 360],
    outputRange: ['-360deg', '0deg', '360deg'],
  });

  const wheelStyle = {
    ...styles.wheel,
    transform: [{ rotate: spinInterpolate }],
  };

  return (
    <Animated.View style={wheelStyle} {...panResponder.panHandlers}>
      {new Array(SECTIONS).fill().map((_, i) => (
        <WheelItem index={i} key={i.toString()} />
      ))}
    </Animated.View>
  );
};

export default SpinWheel;