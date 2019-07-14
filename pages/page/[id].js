import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { fetchNotionPage } from '../../services/api';
import useLivePreview from '../../hooks/useLivePreview';
import Header from '../../components/Header';
import Grid from '../../components/Grid';
import RichText from '../../components/RichText';

const gridStyles = ({ theme }) => css`
  margin-bottom: 4rem;

  > * {
    grid-column: 1 / 13;

    ${theme.mq.kilo} {
      grid-column: 2 / 12;
    }

    ${theme.mq.mega} {
      grid-column: 3 / 11;
    }
  }
`;

const StyledGrid = styled(Grid)(gridStyles);

export default function Page(props) {
  const { content = {}, meta = {} } = useLivePreview(props, fetchNotionPage);

  return (
    <article>
      <Header title={meta.title} image={meta.image} />
      <StyledGrid as="main">
        <RichText content={content} />
      </StyledGrid>
    </article>
  );
}

Page.getInitialProps = fetchNotionPage;
