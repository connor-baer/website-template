import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import url from 'url';

function withPreview(urlObj = {}, preview) {
  const { query = {} } = urlObj;
  return preview ? { ...urlObj, query: { ...query, preview } } : urlObj;
}

export default function Link(props) {
  const { query = {} } = useRouter();
  const hrefObj = url.parse(props.href);
  const asObj = url.parse(props.as || props.href);
  const hrefWithPreview = withPreview(hrefObj, query.preview);
  const asWithPreview = withPreview(asObj, query.preview);

  return (
    <NextLink {...props} href={hrefWithPreview} as={asWithPreview} passHref />
  );
}
