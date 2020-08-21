import {PixelRatio} from 'react-native';

const normalize = (size) => {
  return Math.round(PixelRatio.roundToNearestPixel(size));
};

export const FontSize = {
  fontSize10: normalize(10),
  fontSize12: normalize(12),
  fontSize14: normalize(14),
  fontSize16: normalize(16),
  fontSize18: normalize(18),
};

export const FontFamily = {
  normal: 'sans-serif',
  medium: 'sans-serif-medium',
};
