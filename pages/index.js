import React from 'react';
// eslint-disable-next-line max-len
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { fetchNotionData } from '../services/api';

// eslint-disable-next-line react/prop-types
export default function Page({ content = {}, meta = {} }) {
  return (
    <article>
      <h1>
        {meta.emoji}
        {meta.title}
      </h1>
      {documentToReactComponents(content)}
    </article>
  );
}

Page.getInitialProps = ({ req }) => fetchNotionData(req);
