const tintColorLight = '#128AF9';
const tintColorDark = '#FFF';
export const defaultWhite = '#FFF';
export const defaultBlack = '#000';
export const defaultGray = '#CCC';
export const defaultBackground = '#F4F7FB';
export const linkeColor = '#128AF9';
export const defaultIconColor = linkeColor;

export default {
  light: {
    text: defaultBlack,
    background: defaultWhite,
    tint: tintColorLight,
    tabIconDefault: defaultBlack,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: defaultWhite,
    background: defaultBlack,
    tint: tintColorDark,
    tabIconDefault: defaultBlack,
    tabIconSelected: tintColorDark,
  },
};
