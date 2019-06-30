const { parse } = require('url');
// const { richTextFromNotion } = require('@madebyconnor/rich-text-from-notion');

const Notion = require('../../lib/notion');

module.exports = async (req, res) => {
  try {
    const { query } = parse(req.url, true);

    const isPreview = !!query.preview;

    const collection = await Notion.api.queryCollection(query);
    const meta = Notion.util.getCollectionMeta(collection);
    const content = Notion.util.getCollectionContent(collection, isPreview);

    res.json({ meta, content });
  } catch (error) {
    res.status(error.statusCode || 500);
    res.send(error.stack);
  }
};
