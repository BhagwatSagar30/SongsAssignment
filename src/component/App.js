import React, {Component} from 'react';
import {StyleSheet, StatusBar, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SongDetails from './SongDetails';
import SongsList from './SongsList';
import {Strings} from '../utils/Strings';
import {Colors} from '../utils/Colors';
import {NAVIGATION} from '../constants/Constants';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

class App extends Component {
  componentDidMount() {
    this.splashTimer = setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }
  Logo = () => {
    return <Image style={styles.logo} source={require('../images/logo.png')} />;
  };

  componentWillUnmount() {
    clearTimeout(this.splashTimer);
  }

  render() {
    return (
      <NavigationContainer>
        <StatusBar backgroundColor={Colors.appColor} barStyle="light-content" />
        <Stack.Navigator initialRouteName={NAVIGATION.SONG_LIST}>
          <Stack.Screen
            name={NAVIGATION.SONG_LIST}
            component={SongsList}
            options={{
              title: Strings.song,
              headerLeft: () => this.Logo(),
              headerStyle: {
                backgroundColor: Colors.appColor,
              },
              headerTintColor: Colors.white,
              headerTitleStyle: {
                fontWeight: '600',
              },
            }}
          />
          <Stack.Screen
            name={NAVIGATION.SONG_DETAILS}
            component={SongDetails}
            options={{
              title: Strings.songDetail,
              headerTintColor: Colors.white,
              headerStyle: {
                backgroundColor: Colors.appColor,
              },
              headerTitleStyle: {
                fontWeight: '600',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  logo: {width: 25, height: 25, marginLeft: 14},
});

export default App;
