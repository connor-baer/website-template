import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';

import config from '../config';
import createTheme from '../styles/theme';
import createGlobalStyles from '../styles/global';
import { loadFonts, preloadFonts } from '../styles/fonts';
import isSlowConnection from '../utils/is-slow-connection';
import NProgress from '../components/NProgress';

if (!isSlowConnection()) {
  loadFonts([
    { name: 'Overpass', config: { weight: 400 } },
    { name: 'Overpass', config: { weight: 700 } }
  ]);
}

const { name, locale, twitter } = config.site;

export default class CustomApp extends App {
  render() {
    const { Component, pageProps = {} } = this.props;
    const { meta = {} } = pageProps;
    const { title, description, type, image } = meta;
    const theme = createTheme();
    return (
      <Container>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
          {title && <title>{title}</title>}
          {description && <meta name="description" content={description} />}
          <meta name="twitter:card" content="summary_large_image" />
          {twitter && <meta name="twitter:site" content={`@${twitter}`} />}
          {name && <meta property="og:site_name" content={name} />}
          {title && <meta property="og:title" content={title} />}
          {description && (
            <meta property="og:description" content={description} />
          )}
          {image && <meta property="og:image" content={image} />}
          {type && <meta property="og:type" content={type} />}
          {/* <meta property="og:url" content={cannonicalUrl} /> */}
          {locale && (
            <meta property="og:locale" content={locale.replace('-', '_')} />
          )}
          {preloadFonts(theme.fonts)}
        </Head>

        <ThemeProvider theme={theme}>
          <Global styles={createGlobalStyles(theme)} />
          <NProgress />
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    );
  }
}
