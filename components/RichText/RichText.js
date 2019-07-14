/* eslint-disable react/display-name */
import React from 'react';
import { merge } from 'lodash/fp';
// eslint-disable-next-line max-len
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@madebyconnor/rich-text-from-notion';

import Highlight from '../Highlight';
import Callout from '../Callout';
import Quote from '../Quote';
import Anchor from '../Anchor';
import Paragraph from '../Paragraph';
import Heading from '../Heading';
import Column from '../Column';
import ColumnList from '../ColumnList';
import Embed from '../Embed';
import Divider from '../Divider';
import List from '../List';
import Figure from '../Figure';

const defaultOptions = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => (
      <Heading as="h2">{children}</Heading>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <Heading as="h3">{children}</Heading>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <Heading as="h4">{children}</Heading>
    ),
    [BLOCKS.PARAGRAPH]: (node, children) => <Paragraph>{children}</Paragraph>,
    [BLOCKS.IMAGE]: node => <Figure {...node.data} />,
    [BLOCKS.EMBED]: node => <Embed {...node.data} />,
    [INLINES.HYPERLINK]: (node, children) => (
      <Anchor href={node.data.uri}>{children}</Anchor>
    ),
    [BLOCKS.COLUMN_LIST]: (node = {}, children) => (
      <ColumnList columns={node.content}>{children}</ColumnList>
    ),
    [BLOCKS.COLUMN]: (node, children) => (
      <Column index={node.data.index}>{children}</Column>
    ),
    [BLOCKS.CALLOUT]: (node, children) => (
      <Callout {...node.data}>{children}</Callout>
    ),
    [BLOCKS.QUOTE]: (node, children) => (
      <Quote {...node.data}>{children}</Quote>
    ),
    [BLOCKS.HR]: node => <Divider {...node.data} />,
    [BLOCKS.UL_LIST]: (node, children) => (
      <List {...node.data} type={List.UNORDERED}>
        {children}
      </List>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <List {...node.data} type={List.ORDERED}>
        {children}
      </List>
    )
  },
  renderMark: {
    [MARKS.HIGHLIGHT]: text => <Highlight>{text}</Highlight>
  }
};

export default function RichText({ content, options: customOptions = {} }) {
  const options = merge(defaultOptions, customOptions);
  return documentToReactComponents(content, options);
}
