import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import url from 'url';

import config from '../config';
import { getAllCookies, CookieContext } from '../services/cookies';
import NProgress from '../components/NProgress';
import Theme from '../components/Theme';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

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
    const { Component, pageProps = {}, cookies = {}, router = {} } = this.props;
    const { meta = {} } = pageProps;
    const { title, description, type, image = {} } = meta;
    const { pathname } = url.parse(router.asPath);
    const cannonicalUrl = url.format({
      protocol: 'https',
      hostname: config.domain,
      pathname
    });
    return (
      <Container>
        <CookieContext.Provider value={cookies}>
          <Theme>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
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
              {locale && (
                <meta property="og:locale" content={locale.replace('-', '_')} />
              )}
              <meta property="og:url" content={cannonicalUrl} />
              <link rel="canonical" href={cannonicalUrl} />
              <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/static/icons/apple-touch-icon.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/static/icons/favicon-32x32.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/static/icons/favicon-16x16.png"
              />
              <link rel="manifest" href="/static/icons/site.webmanifest" />
              <link
                rel="mask-icon"
                href="/static/icons/safari-pinned-tab.svg"
                color="#00b0ab"
              />
              <link rel="shortcut icon" href="/static/icons/favicon.ico" />
              <meta
                name="msapplication-config"
                content="/static/icons/browserconfig.xml"
              />
            </Head>

            <NProgress />
            <Navigation />
            <Component {...pageProps} />
            <Footer />
          </Theme>
        </CookieContext.Provider>
      </Container>
    );
  }
}
