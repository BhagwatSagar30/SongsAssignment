import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {Colors} from '../utils/Colors';

const Loader = () => {
  return (
    <ActivityIndicator
      size={30}
      color={Colors.appColor}
      style={styles.loader}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },
});

export default Loader;
