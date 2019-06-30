/* eslint-disable react/display-name */
import React from 'react';
// eslint-disable-next-line max-len
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@madebyconnor/rich-text-from-notion';

import { fetchNotionPage } from '../../services/api';
import useLivePreview from '../../hooks/useLivePreview';
import Image from '../../components/Image';
import Highlight from '../../components/Highlight';
import Callout from '../../components/Callout';
import Anchor from '../../components/Anchor';

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: node => {
      const { src, alt } = node.data;
      return <Image src={src} alt={alt} />;
    },
    [INLINES.HYPERLINK]: (node, children) => (
      <Anchor href={node.data.uri}>{children}</Anchor>
    ),
    [BLOCKS.COLUMN]: (node, children) => (
      <div style={{ width: `${node.data.ratio * 100}%`, float: 'left' }}>
        {children}
      </div>
    ),
    [BLOCKS.CALLOUT]: (node, children) => (
      <Callout {...node.data}>
        {node.data.icon} {children}
      </Callout>
    )
  },
  renderMark: {
    highlight: text => <Highlight>{text}</Highlight>
  }
};

export default function Page(props) {
  const { content = {}, meta = {} } = useLivePreview(props);

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
