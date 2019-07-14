/* eslint-disable react/display-name */
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { BLOCKS } from '@madebyconnor/rich-text-from-notion';

import { fetchNotionPage } from '../services/api';
import { gridStyles, pageWidthStyles } from '../styles/shared';
import useLivePreview from '../hooks/useLivePreview';
import Heading from '../components/Heading';
import RichText from '../components/RichText';
import Image from '../components/Image';

const PAGE_ID = '810feeaf7b5d45e2839f5e847ba6de6c';

const options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => (
      <Heading as="h1">{children}</Heading>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <Heading as="h2">{children}</Heading>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <Heading as="h3">{children}</Heading>
    )
  }
};

const customStyles = ({ theme }) => css`
  margin: 2rem auto 4rem;

  > * {
    min-width: 0;
    grid-column: 1 / 13;

    ${theme.mq.kilo} {
      grid-column: 2 / 12;
    }

    ${theme.mq.mega} {
      grid-column: 3 / 11;
    }
  }
`;

const Article = styled('article')(gridStyles, pageWidthStyles, customStyles);

const imageStyles = ({ theme }) => css`
  border-radius: ${theme.borderRadius.giga};
  grid-column: 1 / 13;

  ${theme.mq.kilo} {
    grid-column: 1 / 6;
  }

  ${theme.mq.mega} {
    order 2;
    grid-column: 9 / 13;
  }
`;

const StyledImage = styled(Image)(imageStyles);

const contentStyles = ({ theme }) => css`
  grid-column: 1 / 13;
  

  ${theme.mq.mega} {
    grid-column: 1 / 8;
    order 1;
  }
`;

const Content = styled('div')(contentStyles);

function getInitialProps(ctx) {
  return fetchNotionPage({
    ...ctx,
    query: { ...ctx.query, id: PAGE_ID }
  });
}

export default function Page(props) {
  const { content = {}, meta = {} } = useLivePreview(props, getInitialProps);

  return (
    <Article>
      <StyledImage {...meta.image} />
      <Content>
        <RichText content={content} options={options} />
      </Content>
    </Article>
  );
}

Page.getInitialProps = getInitialProps;
