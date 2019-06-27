import React from 'react';

import Image from '../components/Image';

const META = {
  title: 'Welcome',
  image: {
    src: 'https://images.unsplash.com/photo-1533745848184-3db07256e163'
  }
};
const CONTENT = {};

export default function Page({ meta = {} }) {
  return (
    <article>
      <h1>{meta.title}</h1>
      <Image {...meta.image} />
    </article>
  );
}

Page.getInitialProps = () => ({ meta: META, content: CONTENT });
