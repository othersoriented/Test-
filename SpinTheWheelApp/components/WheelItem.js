import React from 'react';
import { View, Text } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import PropTypes from 'prop-types';

import styles from '../styles/Styles';
import { COLORS } from '../utils/Constants';

const WheelItem = ({ item, index, radius, angle, angleOffset }) => {
  const { label, color = COLORS[index % COLORS.length] } = item;
  const startAngle = angle * index + angleOffset;
  const endAngle = startAngle + angle;
  const largeArcFlag = angle > 180 ? 1 : 0;

  const x1 = radius * Math.cos(startAngle * Math.PI / 180);
  const y1 = radius * Math.sin(startAngle * Math.PI / 180);
  const x2 = radius * Math.cos(endAngle * Math.PI / 180);
  const y2 = radius * Math.sin(endAngle * Math.PI / 180);

  const d = `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} z`;

  return (
    <View>
      <Svg height="100%" width="100%" viewBox="-250 -250 500 500">
        <Path d={d} fill={color} />
      </Svg>
      <View style={styles.wheelItem}>
        <Text style={styles.wheelItemText}>{label}</Text>
      </View>
    </View>
  );
};

WheelItem.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    color: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  angle: PropTypes.number.isRequired,
  angleOffset: PropTypes.number.isRequired,
};

export default WheelItem;