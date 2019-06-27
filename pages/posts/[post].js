/* eslint-disable react/display-name */
import React from 'react';
// eslint-disable-next-line max-len
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

import { fetchNotionPage } from '../../services/api';
import Image from '../../components/Image';
import Highlight from '../../components/Highlight';
import Anchor from '../../components/Anchor';

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: node => {
      const { src, alt } = node.data;
      return <Image src={src} alt={alt} />;
    },
    [INLINES.HYPERLINK]: (node, children) => (
      <Anchor href={node.data.uri}>{children}</Anchor>
    )
  },
  renderMark: {
    highlight: text => <Highlight>{text}</Highlight>
  }
};

export default function Page({ content = {}, meta = {} }) {
  return (
    <article>
      <h1>
        {meta.emoji} {meta.title}
      </h1>
      {documentToReactComponents(content, options)}
    </article>
  );
}

Page.getInitialProps = ctx => fetchNotionPage(ctx);
