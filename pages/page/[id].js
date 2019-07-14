import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { fetchNotionPage } from '../../services/api';
import { gridStyles, pageWidthStyles } from '../../styles/shared';
import useLivePreview from '../../hooks/useLivePreview';
import Header from '../../components/Header';
import RichText from '../../components/RichText';

const customStyles = ({ theme }) => css`
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

const Grid = styled('main')(gridStyles, pageWidthStyles, customStyles);

export default function Page(props) {
  const { content = {}, meta = {} } = useLivePreview(props, fetchNotionPage);

  return (
    <article>
      <Header title={meta.title} image={meta.image} />
      <Grid>
        <RichText content={content} />
      </Grid>
    </article>
  );
}

Page.getInitialProps = fetchNotionPage;
