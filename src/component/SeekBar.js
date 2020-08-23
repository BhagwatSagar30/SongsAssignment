import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import Slider from 'react-native-slider';
import {Colors} from '../utils/Colors';
import {FontSize} from '../utils/Font';

const SeekBar = ({
  trackLength,
  currentPosition,
  onSlidingComplete,
  onSlidingStart,
}) => {
  const getDesireValue = (position, width, zero = 0) => {
    position = position + '';
    return position.length >= width
      ? position
      : new Array(width - position.length + 1).join(zero) + position;
  };

  const getTrackTime = (position) => [
    getDesireValue(Math.floor(position / 60), 1),
    getDesireValue(position % 60, 1),
  ];

  const elapsed = getTrackTime(currentPosition);
  const totalLength = getTrackTime(trackLength);
  return (
    <View style={styles.container}>
      <Text style={styles.count}>{elapsed[0] + ':' + elapsed[1]}</Text>
      <Slider
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSlidingComplete}
        value={currentPosition}
        maximumValue={Math.max(trackLength, 1, currentPosition)}
        style={styles.slider}
        minimumTrackTintColor={Colors.appColor}
        maximumTrackTintColor={Colors.whiteBorder}
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
      />
      <Text style={styles.count}>
        {trackLength > 1 && totalLength[0] + ':' + totalLength[1]}
      </Text>
    </View>
  );
};

export default SeekBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.whiteBorder,
    borderRadius: 10,
  },
  slider: {
    flex: 1,
  },
  track: {
    backgroundColor: Colors.appColor4,
    height: 10,
    borderRadius: 10,
  },
  thumb: {
    backgroundColor: Colors.appColor,
    width: 13,
    height: 13,
    borderRadius: 13,
  },
  count: {
    color: Colors.black,
    margin: 7,
    fontSize: FontSize.fontSize14,
    textAlign: 'center',
  },
});
