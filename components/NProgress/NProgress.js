import React, { Component } from 'react';
import Router from 'next/router';
import NProgressJS from 'nprogress';
import { Global, css } from '@emotion/core';

export default class NProgress extends Component {
  static defaultProps = {
    delay: 500
  };

  componentDidMount() {
    Router.events.on('routeChangeStart', () => this.startProgress());
    Router.events.on('routeChangeComplete', () => this.endProgress());
    Router.events.on('routeChangeError', () => this.endProgress());
  }

  startProgress = () => {
    this.progressTimerId = setTimeout(() => {
      NProgressJS.start();
      this.progressTimerId = null;
    }, this.props.delay);
  };

  endProgress = () => {
    if (this.progressTimerId) {
      clearTimeout(this.progressTimerId);
    } else {
      NProgressJS.done();
    }
  };

  render() {
    const { theme } = this.props;
    return (
      <Global
        styles={css`
          #nprogress {
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            background: ${theme.colors.white};
            height: 3px;
            pointer-events: none;
            z-index: ${theme.zIndex.nprogress};
          }
          #nprogress .bar {
            background: ${theme.colors.p500};
            height: 100%;
            width: 100%;
          }
          #nprogress .peg {
            box-shadow: 0 0 10px ${theme.colors.p500},
              0 0 5px ${theme.colors.p500};
            display: block;
            height: 100%;
            opacity: 1;
            position: absolute;
            right: 0;
            transform: rotate(3deg) translate(0, -4px);
            width: 100px;
          }
        `}
      />
    );
  }
}
