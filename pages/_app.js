/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';

import config from '../config';
import { getAllCookies, CookieContext } from '../services/cookies';
import NProgress from '../components/NProgress';
import Theme from '../components/Theme';
import Anchor from '../components/Anchor';

const { name, locale, twitter } = config.site;

export default class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const cookies = getAllCookies(ctx);
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps, cookies };
  }

  render() {
    const { Component, pageProps = {}, cookies = {} } = this.props;
    const { meta = {} } = pageProps;
    const { title, description, type, image = {} } = meta;
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
          {image && <meta property="og:image" content={image.src} />}
          {type && <meta property="og:type" content={type} />}
          {/* <meta property="og:url" content={cannonicalUrl} /> */}
          {locale && (
            <meta property="og:locale" content={locale.replace('-', '_')} />
          )}
        </Head>

        <CookieContext.Provider value={cookies}>
          <Theme>
            <NProgress />
            <nav>
              <Anchor href="/">Home</Anchor>{' '}
              <Anchor href="/posts">Posts</Anchor>{' '}
              <Anchor
                href="/posts/[id]"
                as="/posts/45681aeff7a3405c86925a3162a46b5c"
              >
                Matt
              </Anchor>{' '}
              <Anchor
                href="/posts/[id]"
                as="/posts/5dd01c48930a4c7f88def9340191a045"
              >
                Carina
              </Anchor>
            </nav>
            <Component {...pageProps} />
          </Theme>
        </CookieContext.Provider>
      </Container>
    );
  }
}
