import React from 'react';
import { differenceWith, isEqual, isEmpty, pick } from 'lodash/fp';
import FontFaceObserver from 'fontfaceobserver';
import { css } from '@emotion/core';

import isServer from '../utils/is-server';
import addClass from '../utils/add-class';

export function createFontFace({
  name,
  weight,
  style,
  localName,
  unicodeRange,
  sources
}) {
  const src = sources
    .map(({ url, format }) => `url('${url}') format('${format}')`)
    .join(', ');
  return css`
      @font-face {
        font-family: '${name}';
        font-style: ${style};
        font-weight: ${weight};
        font-display: swap;
        src: local('${localName || name}'), ${src};
        unicode-range: ${unicodeRange};
      };
  `;
}

export function preloadFonts(fonts = []) {
  return fonts.map(({ sources }) =>
    sources.map(({ url }) => (
      <link key={url} rel="preload" href={url} as="font" />
    ))
  );
}

export function loadFonts(fonts, timeout = 5000) {
  if (isServer || isEmpty(fonts)) {
    return undefined;
  }

  const prevLoadedFonts =
    sessionStorage.getItem('prevLoadedFonts') &&
    JSON.parse(sessionStorage.getItem('prevLoadedFonts'));

  const fontsToLoad = prevLoadedFonts
    ? differenceWith(isEqual, fonts, prevLoadedFonts)
    : fonts;

  // Optimization for repeat views
  if (isEmpty(fontsToLoad)) {
    addClass(document.documentElement, 'fonts-loaded');
    return undefined;
  }

  const fontPromises = fonts.map(({ name, config } = {}) => {
    const cleanedConfig = pick(['weight', 'style', 'strech'], config);
    const font = new FontFaceObserver(name, cleanedConfig);
    return font.load(null, timeout);
  });

  return Promise.all(fontPromises)
    .then(loaded => {
      // eslint-disable-next-line no-console
      console.info(
        `Loaded fonts "${loaded
          .map(({ family, style, weight }) => `${family} ${weight} ${style}`)
          .join(', ')}"`
      );
      addClass(document.documentElement, 'fonts-loaded');
      // Optimization for repeat views
      sessionStorage.setItem('prevLoadedFonts', JSON.stringify(fonts));
    })
    .catch(e => {
      // eslint-disable-next-line no-console
      console.warn(`Failed to load font "${e.family}"`);
    });
}
