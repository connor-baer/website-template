const { parse } = require('url');

const Notion = require('../lib/notion');

module.exports = async (req, res) => {
  try {
    const { query = {} } = parse(req.url, true);

    const page = await Notion.api.queryPageChunk(query);
    const content = Notion.util.getPageContent(page);
    const meta = Notion.util.getPageMeta(page);

    const isPreview = !!query.preview;

    if (!meta.isLive && !isPreview) {
      res.status(404);
      res.json({ error: 'Not found' });
      return;
    }

    res.json({ meta, content });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(error.statusCode || 500);
    res.json({ error: error.stack });
  }
};
