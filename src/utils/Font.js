import {PixelRatio} from 'react-native';

const normalize = (size) => {
  return Math.round(PixelRatio.roundToNearestPixel(size));
};

export const FontSize = {
  fontSize10: normalize(10),
  fontSize11: normalize(11),
  fontSize12: normalize(12),
  fontSize14: normalize(14),
  fontSize16: normalize(16),
  fontSize17: normalize(17),
  fontSize18: normalize(18),
  fontSize20: normalize(20),
};
