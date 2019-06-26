import url from 'url';
import fetch from 'isomorphic-unfetch';

import { API_BASEURL } from '../constants/api';

const PAGE_ID = '45681aeff7a3405c86925a3162a46b5c';

function getHost(req = {}) {
  if (process.env.DEV) {
    return 'localhost:3000';
  }
  return req ? req.headers.host : '';
}

function fetchData(fullUrl) {
  return fetch(fullUrl)
    .then(r => r.json())
    .catch(error => ({ error }));
}

// eslint-disable-next-line import/prefer-default-export
export function fetchNotionData(ctx = {}) {
  const { query = {} } = ctx;
  const { post: pageId = PAGE_ID } = query;
  const host = getHost(ctx.req);
  const protocol = process.env.DEV ? 'http' : 'https';
  const pathname = `${API_BASEURL}/page`;
  const fullUrl = url.format({ protocol, host, pathname, query: { pageId } });
  return fetchData(fullUrl);
}
