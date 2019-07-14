const { parse } = require('url');
// const { richTextFromNotion } = require('@madebyconnor/rich-text-from-notion');

const Notion = require('../../services/notion');

module.exports = async (req, res) => {
  try {
    const { query } = parse(req.url, true);

    const isPreview = !!query.preview;

    const collection = await Notion.api.queryCollection(query);
    const meta = Notion.util.getCollectionMeta(collection);
    const pages = Notion.util.getCollectionPages(collection, isPreview);

    res.json({ meta, pages, collection });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(error.statusCode || 500);
    res.send(error.stack);
  }
};
