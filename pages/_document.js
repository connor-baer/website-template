import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { get } from 'lodash/fp';

import config from '../config';

const locale = get('site.locale', config);
const language = locale.slice(0, 2);

export default class CustomDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang={language}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
