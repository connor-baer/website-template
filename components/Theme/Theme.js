import React, { useState, useContext, useCallback, useRef } from 'react';
import Head from 'next/head';
import { Global, css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';

import createTheme from '../../styles/theme';
import createGlobalStyles from '../../styles/global';
import { preloadFonts } from '../../styles/fonts';
import { setCookie, CookieContext } from '../../services/cookies';
import useMedia from '../../hooks/useMedia';

const TRANSITION_DURATION = 200; // milliseconds

export default function Theme({ children }) {
  const cookies = useContext(CookieContext);
  const [darkmode, setDarkmode] = useState(cookies.darkmode === 'true');
  const [reducedMotion, setReducedMotion] = useState(
    cookies.reducedMotion === 'true'
  );
  const [isTransitioning, setTransitioning] = useState(false);
  const timerId = useRef(null);

  const animate = callback => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    } else {
      setTransitioning(true);
    }

    callback();

    timerId.current = setTimeout(() => {
      setTransitioning(false);
      timerId.current = null;
    }, TRANSITION_DURATION);
  };

  const updateReducedMotion = useCallback(isReducedMotion => {
    setCookie('reducedMotion', isReducedMotion);
    setReducedMotion(isReducedMotion);
  }, []);

  const updateDarkmode = useCallback(isDark => {
    animate(() => {
      setCookie('darkmode', isDark);
      setDarkmode(isDark);
    });
  }, []);

  useMedia('(prefers-reduced-motion)', updateReducedMotion);
  useMedia('(prefers-color-scheme: dark)', updateDarkmode);

  const theme = createTheme({ darkmode, reducedMotion });

  const toggleDarkmode = () => updateDarkmode(!darkmode);
  const toggleReducedMotion = () => updateReducedMotion(!reducedMotion);

  return (
    <>
      <Head>
        <meta name="theme-color" content={theme.colors.bodyBg} />
        <meta name="msapplication-TileColor" content={theme.colors.p500} />
        {preloadFonts(theme.fonts)}
      </Head>
      {isTransitioning && (
        <Global
          styles={css`
            * {
              transition: background-color ${TRANSITION_DURATION}ms,
                color ${TRANSITION_DURATION}ms, fill ${TRANSITION_DURATION}ms,
                border-color ${TRANSITION_DURATION}ms !important;
            }
          `}
        />
      )}

      <ThemeProvider theme={{ ...theme, toggleDarkmode, toggleReducedMotion }}>
        <Global
          styles={css`
            ${createGlobalStyles(theme)}
          `}
        />
        {children}
      </ThemeProvider>
    </>
  );
}
