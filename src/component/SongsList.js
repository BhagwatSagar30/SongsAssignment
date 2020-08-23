import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  PixelRatio,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../utils/Colors';
import {FontSize} from '../utils/Font';
import {NAVIGATION, DOWNLOAD_PATH} from '../constants/Constants';
import RNFS from 'react-native-fs';
import Loader from './Loader';

class SongsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isRefresh: false,
      songList: [],
    };
  }

  async componentDidMount() {
    this.fetchSongList();
  }

  /**
   * fetch list form server
   */
  fetchSongList = () => {
    RNFS.downloadFile({
      fromUrl: 'https://itunes.apple.com/search?term=Michael+jackson',
      toFile: DOWNLOAD_PATH,
    })
      .promise.then(() => {
        RNFS.readFile(DOWNLOAD_PATH)
          .then((result) => {
            let response = JSON.parse(result);
            this.setState({
              isLoading: false,
              isRefresh: false,
              songList: response.results,
            });
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => console.error(err));
  };

  onListItemClick = (item) => {
    const {navigation} = this.props;
    navigation.navigate(NAVIGATION.SONG_DETAILS, {details: item});
  };

  renderItem = ({item}) => {
    let trackTime = new Date(item.trackTimeMillis);
    return (
      <TouchableOpacity
        onPress={() => this.onListItemClick(item)}
        style={styles.item}>
        <View style={styles.imageView}>
          <Image style={styles.logo} source={{uri: item.artworkUrl100}} />
        </View>
        <View style={styles.detailView}>
          <Text style={styles.title}>{item.trackName}</Text>
          <Text style={styles.collectionName}>{item.collectionName}</Text>
          <View style={styles.artistDetailsView}>
            <Text style={styles.artistName}>{item.artistName}</Text>
            <Text style={styles.trackTime}>
              {trackTime.getUTCMinutes() + ':' + trackTime.getUTCSeconds()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  onRefresh = () => {
    this.setState({isRefresh: true}, () => {
      this.fetchSongList();
    });
  };

  render() {
    const {songList, isLoading, isRefresh} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <Loader />
        ) : (
          <FlatList
            data={songList}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.trackId.toString()}
            onRefresh={this.onRefresh}
            refreshing={isRefresh}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white9,
  },
  logo: {
    width: PixelRatio.getPixelSizeForLayoutSize(20),
    height: PixelRatio.getPixelSizeForLayoutSize(20),
    borderRadius: 7,
  },
  detailView: {marginLeft: 7, flex: 1, marginRight: 7},
  artistDetailsView: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 5,
  },
  item: {
    backgroundColor: Colors.white,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 10,
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignContent: 'center',
  },
  imageView: {alignItems: 'center', justifyContent: 'center'},
  title: {
    fontSize: FontSize.fontSize16,
    fontWeight: '600',
    color: Colors.textBlack,
  },
  collectionName: {
    fontSize: FontSize.fontSize12,
    fontWeight: '200',
    color: Colors.darkGrey,
  },
  artistName: {
    flex: 1,
    fontSize: FontSize.fontSize12,
    color: Colors.textBlack,
  },
  trackTime: {
    textAlign: 'right',
    fontSize: FontSize.fontSize11,
    color: Colors.textBlack,
  },
});

export default SongsList;
