import url from 'url';
import fetch from 'isomorphic-unfetch';

import { API_BASEURL } from '../constants/api';

function getHost(req) {
  if (process.env.DEV) {
    return 'localhost:3000';
  }
  return req ? req.headers.host : '';
}

function getProtocol(req) {
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
      throw error;
    });
}

export function fetchNotionPage(ctx = {}) {
  const { query = {} } = ctx;
  const { id: pageId, ...rest } = query;
  const host = getHost(ctx.req);
  const protocol = getProtocol(ctx.req);
  const pathname = `${API_BASEURL}/page`;
  const fullUrl = url.format({
    protocol,
    host,
    pathname,
    query: { pageId, ...rest }
  });
  return fetchData(fullUrl);
}

export function fetchNotionCollection(ctx = {}, params) {
  const { query = {} } = ctx;
  const host = getHost(ctx.req);
  const protocol = getProtocol(ctx.req);
  const pathname = `${API_BASEURL}/collection`;
  const fullUrl = url.format({
    protocol,
    host,
    pathname,
    query: { ...query, ...params }
  });
  return fetchData(fullUrl);
}
