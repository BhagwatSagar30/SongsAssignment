import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  PixelRatio,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {FontSize} from '../utils/Font';
import {Colors} from '../utils/Colors';
import Video from 'react-native-video';
import SeekBar from './SeekBar';
import Loader from './Loader';

class SongDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlay: false,
      totalLength: 1,
      currentPosition: 0,
      isLoading: true,
    };
    this.audioRef = React.createRef();
  }

  /**
   * Play pause the song
   */
  onPlayPauseButtonClick = () => {
    if (this.state.isPlay) {
      this.setState({isPlay: false});
    } else {
      this.setState({isPlay: true});
    }
  };

  /**
   * set the total duration to seek bar
   */
  setDuration = (data) => {
    this.setState({isLoading: false});
    this.setState({totalLength: Math.floor(data.duration)});
  };

  /**
   * Set current time to seek bar
   */
  setCurrentTime = (data) => {
    this.setState({isLoading: false});
    this.setState({currentPosition: Math.floor(data.currentTime)});
  };

  /**
   * On sliding of slide bar
   */
  onSlidingComplete = (time) => {
    time = Math.round(time);
    this.audioRef.current && this.audioRef.current.seek(time);
    this.setState({
      currentPosition: time,
      isPlay: true,
    });
  };

  loadingAudio = () => {
    // this.setState({isLoading: true});
  };

  render() {
    const {
      route: {params},
    } = this.props;
    const {isLoading, totalLength, currentPosition, isPlay} = this.state;
    return (
      <View style={styles.mainView}>
        <View style={styles.imageTopView}>
          <Image
            style={styles.image}
            source={{uri: params.details.artworkUrl100}}
          />
          <Text style={styles.title}>{params.details.trackName}</Text>
          <Text style={styles.artistName}>{params.details.artistName}</Text>
        </View>
        {isLoading ? <Loader /> : null}
        <View style={styles.controlsView}>
          <SeekBar
            onSlidingComplete={this.onSlidingComplete}
            trackLength={totalLength}
            onSlidingStart={() => this.setState({isPlay: false})}
            currentPosition={currentPosition}
          />
          <Video
            ref={this.audioRef}
            source={{uri: params.details.previewUrl}}
            paused={!isPlay}
            resizeMode="cover"
            repeat={true}
            onLoadStart={this.loadingAudio}
            onLoad={this.setDuration}
            onProgress={this.setCurrentTime}
          />

          <View style={styles.buttonView}>
            <TouchableOpacity
              onPress={this.onPlayPauseButtonClick}
              disabled={isLoading}>
              <Image
                style={{
                  width: PixelRatio.getPixelSizeForLayoutSize(25),
                  height: PixelRatio.getPixelSizeForLayoutSize(25),
                }}
                source={
                  isPlay === true
                    ? require('../images/ic_pause.png')
                    : require('../images/ic_play.png')
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {flex: 1, backgroundColor: Colors.white9},
  image: {
    width: PixelRatio.getPixelSizeForLayoutSize(70),
    height: PixelRatio.getPixelSizeForLayoutSize(70),
    borderRadius: 7,
  },
  imageTopView: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    shadowColor: Colors.darkGrey,
    shadowOffset: {width: 0, height: 1.5},
    shadowOpacity: 0.5,
  },
  controlsView: {
    flex: 0.4,
  },
  title: {
    fontSize: FontSize.fontSize20,
    fontWeight: 'bold',
    color: Colors.textBlack,
    textAlign: 'center',
    margin: 16,
  },
  artistName: {
    fontSize: FontSize.fontSize16,
    color: Colors.darkGrey,
    textAlign: 'center',
    marginBottom: 16,
  },
  collectionName: {
    fontSize: FontSize.fontSize12,
    fontWeight: '200',
    color: Colors.darkGrey,
    textAlign: 'center',
    marginLeft: 16,
    marginRight: 16,
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 24,
  },
});

export default SongDetails;
