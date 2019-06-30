import React from 'react';

import { fetchNotionCollection } from '../../services/api';
import useLivePreview from '../../hooks/useLivePreview';
import Image from '../../components/Image';
import Anchor from '../../components/Anchor';

const COLLECTION_ID = 'f065ca78f9d6401ca205bff704d69c93';
const COLLECTION_VIEW_ID = '826956a5aa764d0bbbc98ca761dd11e9';

export default function Page(props) {
  const { content = [], meta = {} } = useLivePreview(props);

  return (
    <>
      <Image {...meta.image} />
      <h1>
        {meta.icon} {meta.title}
      </h1>
      {content.map(page => (
        <article key={page.id}>
          <Anchor href="/posts/[id]" as={`/posts/${page.id}`}>
            <h2>{page.title}</h2>
          </Anchor>
        </article>
      ))}
    </>
  );
}

Page.getInitialProps = ctx =>
  fetchNotionCollection(ctx, {
    collectionId: COLLECTION_ID,
    collectionViewId: COLLECTION_VIEW_ID
  });
