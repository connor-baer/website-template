import React from 'react';
// eslint-disable-next-line max-len
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { fetchNotionData } from '../services/api';

// eslint-disable-next-line react/prop-types
export default function Page({ content = [] }) {
  return <>{documentToReactComponents(content)}</>;
}

Page.getInitialProps = ({ req }) => fetchNotionData(req);
