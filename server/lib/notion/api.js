/* eslint-disable camelcase */
const fetch = require('node-fetch');

const NOTION = require('../../../constants/notion');

async function rpc(fnName, body = {}) {
  const res = await fetch(`${NOTION.API_BASEURL}${fnName}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (res.ok) {
    return res.json();
  }

  throw new Error(await getError(res));
}

async function getError(res) {
  const headers = JSON.stringify(res.headers.raw());
  const body = await getBodyOrNull(res);
  return `Notion API error (${res.status}) \n${headers}\n ${body}`;
}

function getBodyOrNull(res) {
  try {
    return res.text();
  } catch (err) {
    return null;
  }
}

function normalizeId(pageId = '') {
  return pageId
    .replace(/-/g, '')
    .replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
}

function queryPageChunk({
  pageId,
  limit = 100,
  cursor = { stack: [] },
  chunkNumber = 0,
  verticalColumns = false
}) {
  return rpc('loadPageChunk', {
    pageId: normalizeId(pageId),
    limit,
    cursor,
    chunkNumber,
    verticalColumns
  });
}

function queryCollection({
  collectionId,
  collectionViewId,
  loader = {},
  query = {}
}) {
  const {
    limit = 70,
    loadContentCover = true,
    type = 'table',
    userLocale = 'en',
    userTimeZone = 'America/Los_Angeles'
  } = loader;

  const {
    aggregate = [
      {
        aggregation_type: 'count',
        id: 'count',
        property: 'title',
        type: 'title',
        view_type: 'table'
      }
    ],
    filter = [],
    filter_operator = 'and',
    sort = []
  } = query;

  return rpc('queryCollection', {
    collectionId: normalizeId(collectionId),
    collectionViewId: normalizeId(collectionViewId),
    loader: {
      limit,
      loadContentCover,
      type,
      userLocale,
      userTimeZone
    },
    query: {
      aggregate,
      filter,
      filter_operator,
      sort
    }
  });
}

module.exports = {
  queryPageChunk,
  queryCollection
};
