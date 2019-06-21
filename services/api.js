import url from 'url';
import fetch from 'isomorphic-unfetch';

import { API_BASEURL } from '../constants/api';

const PAGE_ID = '45681aeff7a3405c86925a3162a46b5c';

function getHost(req) {
  if (process.env.DEV) {
    return 'http://localhost:3000';
  }
  return req ? `https://${req.headers.host}` : '';
}

function fetchData(fullUrl) {
  return fetch(fullUrl)
    .then(r => r.json())
    .catch(error => ({ error }));
}

// eslint-disable-next-line import/prefer-default-export
export function fetchNotionData(req) {
  const host = getHost(req);
  const pathname = `${API_BASEURL}/page`;
  const query = { pageId: PAGE_ID };
  const fullUrl = url.format({ host, pathname, query });
  return fetchData(fullUrl);
}
