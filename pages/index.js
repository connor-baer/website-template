/* eslint-disable react/display-name */
import React from 'react';
// eslint-disable-next-line max-len
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

import { fetchNotionData } from '../services/api';
import Image from '../components/Image';

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: node => {
      const { src, alt } = node.data;
      return <Image src={src} alt={alt} />;
    }
  }
};

export default function Page({ content = {}, meta = {} }) {
  return (
    <article>
      <h1>
        {meta.emoji}
        {meta.title}
      </h1>
      {documentToReactComponents(content, options)}
    </article>
  );
}

Page.getInitialProps = ({ req }) => fetchNotionData(req);
