/* eslint-disable react/display-name */
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
// eslint-disable-next-line max-len
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@madebyconnor/rich-text-from-notion';

import Highlight from '../Highlight';
import Anchor from '../Anchor';
import Paragraph from '../Paragraph';
import Image from '../Image';

const wrapperStyles = () => css`
  margin: 1rem 0;
`;

const Wrapper = styled('figure')(wrapperStyles);

const captionStyles = ({ theme }) => css`
  text-align: center;
  color: ${theme.colors.n500};
  display: block;

  p {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }
`;

const Caption = styled('figcaption')(captionStyles);

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Paragraph>{children}</Paragraph>,
    [INLINES.HYPERLINK]: (node, children) => (
      <Anchor href={node.data.uri}>{children}</Anchor>
    )
  },
  renderMark: {
    [MARKS.HIGHLIGHT]: text => <Highlight>{text}</Highlight>
  }
};

export default function Figure({ className, caption, ...props }) {
  return (
    <Wrapper className={className}>
      <Image loading="lazy" {...props} />
      {caption && (
        <Caption>{documentToReactComponents(caption, options)}</Caption>
      )}
    </Wrapper>
  );
}
