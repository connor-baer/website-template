const fetch = require('node-fetch');
const { parse } = require('url');

const NOTION = require('../../constants/notion');

module.exports = async (req, res) => {
  const {
    query: { url }
  } = parse(req.url, true);

  const imageReq = await fetch(
    `${NOTION.IMAGE_BASEURL}${encodeURIComponent(url)}`
  );

  res.setHeader('content-type', imageReq.headers.get('content-type'));
  res.setHeader('cache-control', 's-maxage=1, stale-while-revalidate');

  imageReq.body.pipe(res);
};
