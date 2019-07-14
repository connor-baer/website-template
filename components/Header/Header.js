import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { getSrc } from '../Image/ImageService';
import {
  fullWidthStyles,
  gridStyles,
  pageWidthStyles
} from '../../styles/shared';

const wrapperStyles = ({ theme }) => css`
  ${theme.mq.kilo} {
    padding-right: 2rem;
    padding-left: 2rem;
  }
`;

const Wrapper = styled('header')(wrapperStyles, fullWidthStyles);

const backgroundStyles = ({ theme, image = {} }) => css`
  width: 100%;
  height: 25rem;
  background-color: ${theme.colors.offBlack};
  background-image: url("${getSrc(image.src, { width: 1500, height: 500 })}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 3rem;
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.offBlack};
    top: 0;
    opacity: 0.2;
  }

  ${theme.mq.kilo} {
    border-radius: ${theme.borderRadius.giga};
    overflow: hidden;
  }
`;

const Background = styled('div')(backgroundStyles);

const titleStyles = ({ theme }) => css`
  font-size: 3rem;
  color: #fff;
  grid-column: 1 / -1;
  position: absolute;
  bottom: 3rem;
  margin: 0;
  z-index: 1;
  text-shadow: 1px 2px 6px rgba(0, 0, 0, 0.2);

  ${theme.mq.kilo} {
    grid-column: 1 / 10;
    bottom: 4rem;
  }

  ${theme.mq.mega} {
    grid-column: 1 / 8;
    bottom: 5rem;
  }
`;

const Title = styled('h1')(titleStyles);

const contentStyles = () => css`
  position: relative;
  height: 100%;
`;

const Content = styled('div')(gridStyles, pageWidthStyles, contentStyles);

export default function Header({ title, ...rest }) {
  return (
    <Wrapper>
      <Background {...rest}>
        <Content>
          <Title>{title}</Title>
        </Content>
      </Background>
    </Wrapper>
  );
}
