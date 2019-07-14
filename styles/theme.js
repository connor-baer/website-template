import openColor from 'open-color/open-color.json';
import { mapValues } from 'lodash/fp';

/* eslint-disable max-len */

const fonts = [
  {
    name: 'Overpass',
    localName: 'Overpass Light',
    weight: '300',
    style: 'normal',
    sources: [
      {
        url:
          'https://fonts.gstatic.com/s/overpass/v3/qFdA35WCmI96Ajtm81kOcc7D4hoiiVI6DLE.woff2',
        format: 'woff2'
      }
    ],
    unicodeRange:
      'U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF'
  },
  {
    name: 'Overpass',
    localName: 'Overpass Bold',
    weight: '700',
    style: 'normal',
    sources: [
      {
        url:
          'https://fonts.gstatic.com/s/overpass/v3/qFdA35WCmI96Ajtm81keds7D4hoiiVI6DLE.woff2',
        format: 'woff2'
      }
    ],
    unicodeRange:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
  }
];

const fontFamily = {
  default:
    "'Overpass', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
  sans:
    "'Overpass', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
  serif: 'Georgia, serif',
  mono: 'Courier New, mono-space'
};

/* eslint-enable max-len */

const fontWeight = {
  regular: '300',
  bold: '700'
};

const iconSizes = {
  byte: '12px',
  kilo: '16px',
  mega: '24px',
  giga: '36px'
};

const borderWidth = {
  kilo: '1px',
  mega: '2px'
};

const borderRadius = {
  kilo: '1px',
  mega: '4px',
  giga: '6px'
};

const zIndex = {
  nprogress: 999
};

const neutralsLight = {
  n100: openColor.gray[1],
  n300: openColor.gray[3],
  n500: openColor.gray[6],
  n700: openColor.gray[7],
  n900: openColor.gray[9]
};

const neutralsDark = {
  n100: openColor.gray[9],
  n300: openColor.gray[7],
  n500: openColor.gray[5],
  n700: openColor.gray[3],
  n900: openColor.gray[1]
};

const violets = {
  v100: openColor.violet[1],
  v300: openColor.violet[3],
  v500: openColor.violet[5],
  v700: openColor.violet[7],
  v900: openColor.violet[9]
};

const blues = {
  b100: openColor.blue[1],
  b300: openColor.blue[3],
  b500: openColor.blue[5],
  b700: openColor.blue[7],
  b900: openColor.blue[9]
};

const greens = {
  g100: openColor.green[1],
  g300: openColor.green[3],
  g500: openColor.green[5],
  g700: openColor.green[7],
  g900: openColor.green[9]
};

const yellows = {
  y100: openColor.yellow[1],
  y300: openColor.yellow[3],
  y500: openColor.yellow[5],
  y700: openColor.yellow[7],
  y900: openColor.yellow[9]
};

const oranges = {
  o100: openColor.orange[1],
  o300: openColor.orange[3],
  o500: openColor.orange[5],
  o700: openColor.orange[7],
  o900: openColor.orange[9]
};

const reds = {
  r100: openColor.red[1],
  r300: openColor.red[3],
  r500: openColor.red[5],
  r700: openColor.red[7],
  r900: openColor.red[9]
};

const primary = {
  p100: openColor.pink[1],
  p300: openColor.pink[3],
  p500: openColor.pink[5],
  p700: openColor.pink[7],
  p900: openColor.pink[9]
};

const misc = {
  danger: reds.r500,
  success: greens.g700,
  warning: yellows.y700
};

const breakpoints = {
  untilKilo: '(max-width: 599px)',
  kilo: 600,
  kiloToMega: '(min-width: 600px) and (max-width: 899px)',
  mega: 900,
  untilMega: '(max-width: 899px)',
  megaToGiga: '(min-width: 900px) and (max-width: 1199px)',
  giga: 1200,
  gigaToTera: '(min-width: 1200px) and (max-width: 1499px)',
  tera: 1500,
  afterTera: '(min-width: 1500px)'
};

export function createColors(darkmode = false) {
  const shadow = '#0C0F14';
  const selectionBg = openColor.yellow[3];
  const selectionColor = openColor.black;
  const offBlack = '#15191d'; // '#1b1f22';
  const white = darkmode ? openColor.black : openColor.white;
  const black = darkmode ? openColor.white : openColor.black;
  const bodyBg = darkmode ? offBlack : openColor.white;
  const bodyColor = darkmode ? openColor.white : offBlack;
  const neutrals = darkmode ? neutralsDark : neutralsLight;
  return {
    white,
    black,
    bodyBg,
    bodyColor,
    selectionBg,
    selectionColor,
    shadow,
    offBlack,
    ...neutrals,
    ...violets,
    ...blues,
    ...greens,
    ...yellows,
    ...oranges,
    ...reds,
    ...primary,
    ...misc
  };
}

export function createAnimations(reducedMotion = false) {
  return {
    micro: '160ms cubic-bezier(0, 0, 0.2, 1)',
    standard: '320ms cubic-bezier(0, 0, 0.2, 1)',
    motion: reducedMotion ? '0s' : '320ms cubic-bezier(0, 0, 0.2, 1)'
  };
}

export const createMediaQueries = mapValues(mediaExpression => {
  const { prefix = '', suffix = '' } =
    typeof mediaExpression === 'string'
      ? {}
      : { prefix: '(min-width: ', suffix: 'px)' };

  const enhancedExpression = prefix + mediaExpression + suffix;

  return `@media ${enhancedExpression}`;
});

export default function createTheme({
  darkmode = false,
  reducedMotion = false
} = {}) {
  return {
    darkmode,
    reducedMotion,
    fonts,
    fontFamily,
    fontWeight,
    iconSizes,
    borderWidth,
    borderRadius,
    zIndex,
    breakpoints,
    colors: createColors(darkmode),
    animations: createAnimations(reducedMotion),
    mq: createMediaQueries(breakpoints)
  };
}
