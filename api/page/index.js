const { parse } = require('url');
const { get } = require('lodash/fp');

const { loadPageChunk } = require('./notion-api');
const { notionToRichText } = require('./notion-to-rich-text');
const { getNotionMeta } = require('./notion-meta');

module.exports = async (req, res) => {
  try {
    const { query } = parse(req.url, true);

    const data = await loadPageChunk(query);

    const blocks = get('recordMap.block', data);
    const content = notionToRichText(blocks);
    const meta = getNotionMeta(data);

    res.json({ meta, content });
  } catch (error) {
    res.status(error.statusCode || 500);
    res.send(error.stack);
  }
};
