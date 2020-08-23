import RNFS from 'react-native-fs';
import {Platform} from 'react-native';

export const NAVIGATION = {
  SONG_LIST: 'SongList',
  SONG_DETAILS: 'SongDetails',
};

export const DOWNLOAD_PATH =
  Platform.OS === 'ios'
    ? `${RNFS.MainBundlePath}/songs.txt`
    : `${RNFS.DocumentDirectoryPath}/songs.txt`;
