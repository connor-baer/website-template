/* eslint-disable react/display-name */
import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { gridStyles, pageWidthStyles } from '../styles/shared';
import Heading from '../components/Heading';
import Anchor from '../components/Anchor';

const Article = styled('article')(gridStyles, pageWidthStyles);

const headerStyles = ({ theme }) => css`
  grid-column: 1 / 13;
  margin: 4rem 0 2rem;

  ${theme.mq.kilo} {
    grid-column: 1 / 11;
    margin: 6rem 0 4rem;
  }

  ${theme.mq.mega} {
    grid-column: 1 / 10;
    margin: 8rem 0 6rem;
  }

  ${theme.mq.giga} {
    margin: 10rem 0 8rem;
  }
`;

const Content = styled('main')(headerStyles);

export default function Page() {
  return (
    <Article>
      <Content>
        <Heading as="h1">An error has occured</Heading>
        <Anchor href="/">Go back home</Anchor>
      </Content>
    </Article>
  );
}
