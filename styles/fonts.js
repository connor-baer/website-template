import React from 'react';
import { css } from '@emotion/core';

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
