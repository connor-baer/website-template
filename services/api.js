import url from 'url';
import fetch from 'isomorphic-unfetch';

import { API_BASEURL } from '../constants/api';

function getHost(req = {}) {
  if (process.env.DEV) {
    return 'localhost:3000';
  }
  return req ? req.headers.host : '';
}

function getProtocol(req = {}) {
  if (process.env.DEV) {
    return 'http';
  }
  return req ? 'https' : '';
}

function fetchData(fullUrl) {
  return fetch(fullUrl)
    .then(r => r.json())
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(error);
      return { error };
    });
}

// eslint-disable-next-line import/prefer-default-export
export function fetchNotionPage(ctx = {}) {
  const { query = {} } = ctx;
  const { post: pageId } = query;
  const host = getHost(ctx.req);
  const protocol = getProtocol(ctx.req);
  const pathname = `${API_BASEURL}/page`;
  const fullUrl = url.format({ protocol, host, pathname, query: { pageId } });
  return fetchData(fullUrl);
}
