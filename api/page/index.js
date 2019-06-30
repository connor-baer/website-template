const { parse } = require('url');
const { richTextFromNotion } = require('@madebyconnor/rich-text-from-notion');

const { loadPageChunk } = require('./notion-api');
const { getNotionMeta } = require('./notion-meta');

module.exports = async (req, res) => {
  try {
    const { query } = parse(req.url, true);

    const page = await loadPageChunk(query);
    const content = richTextFromNotion(page, { preserveLayout: true });
    const meta = getNotionMeta(page);

    res.json({ meta, content, page });
  } catch (error) {
    res.status(error.statusCode || 500);
    res.send(error.stack);
  }
};
