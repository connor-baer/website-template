import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';

import createTheme from '../styles/theme';
import createGlobalStyles from '../styles/global';

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const { title, description } = pageProps.meta;
    return (
      <Container>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
          {title && <title>{title}</title>}
          {description && <meta name="description" content={description} />}
        </Head>

        <ThemeProvider theme={createTheme()}>
          <Global styles={createGlobalStyles()} />
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    );
  }
}
