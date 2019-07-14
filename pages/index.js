/* eslint-disable react/display-name */
import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
// eslint-disable-next-line max-len
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@madebyconnor/rich-text-from-notion';

import { fetchNotionCollection, fetchNotionPage } from '../services/api';
import { pageWidthStyles, gridStyles } from '../styles/shared';
import Heading from '../components/Heading';
import useLivePreview from '../hooks/useLivePreview';
import Paragraph from '../components/Paragraph';
import ColumnList from '../components/ColumnList';
import Column from '../components/Column';
import Highlight from '../components/Highlight';
import Link from '../components/Link';

const PAGE_ID = '98bd911c816743eea125a4d09a93188b';
const COLLECTION_ID = 'f065ca78f9d6401ca205bff704d69c93';
const COLLECTION_VIEW_ID = 'acfc4dbf9aac406db2f93620711f537e';

function getInitialProps(ctx) {
  return Promise.all([
    fetchNotionCollection(ctx, {
      collectionId: COLLECTION_ID,
      collectionViewId: COLLECTION_VIEW_ID
    }),
    fetchNotionPage({
      ...ctx,
      query: { ...ctx.query, id: PAGE_ID }
    })
  ]).then(([collection, page]) => ({ collection, ...page }));
}

const headerStyles = ({ theme }) => css`
  grid-column: 1 / 13;
  margin: 2rem 0;

  ${theme.mq.kilo} {
    grid-column: 1 / 11;
    margin: 4rem 0;
  }

  ${theme.mq.mega} {
    grid-column: 1 / 10;
    margin: 6rem 0;
  }

  ${theme.mq.giga} {
    margin: 8rem 0;
  }
`;

const Header = styled('header')(headerStyles);

const Grid = styled('main')(gridStyles, pageWidthStyles);

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
    ),
    [BLOCKS.PARAGRAPH]: (node, children) => <Paragraph>{children}</Paragraph>,
    [BLOCKS.COLUMN_LIST]: (node = {}, children) => (
      <ColumnList columns={node.content}>{children}</ColumnList>
    ),
    [BLOCKS.COLUMN]: (node, children) => (
      <Column index={node.data.index}>{children}</Column>
    )
  },
  renderMark: {
    [MARKS.HIGHLIGHT]: text => <Highlight>{text}</Highlight>
  }
};

const Pages = styled('div')(pageWidthStyles);

export function Component({ content = {}, collection = {} }) {
  const { pages = [] } = collection;
  return (
    <article>
      <Grid>
        <Header>{documentToReactComponents(content, options)}</Header>
      </Grid>
      <Pages>
        <Heading as="h2">All Pages</Heading>
        {pages.map(({ id, title }) => {
          const linkProps = {
            href: '/page/[id]',
            as: `/page/${id}`,
            passHref: true
          };
          return (
            <Link key={id} {...linkProps}>
              <a>
                <Heading as="h3" size="h4">
                  {title}
                </Heading>
              </a>
            </Link>
          );
        })}
      </Pages>
    </article>
  );
}

export default function Page(props) {
  const data = useLivePreview(props, getInitialProps);
  return <Component {...data} />;
}

Page.getInitialProps = getInitialProps;
