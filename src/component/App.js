import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Text} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.mainView}>
        <Text>Initial Setup</Text>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {flex: 1},
});

export default App;
