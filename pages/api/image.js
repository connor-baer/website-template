const sharp = require('sharp');
const fetch = require('node-fetch');
const { includes } = require('lodash/fp');
const { parse } = require('url');

const NOTION = require('../../constants/notion');

module.exports = async (req, res) => {
  const {
    query: { url, w, h, fm, fit = 'cover', bg: background = 'black' }
  } = parse(req.url, true);

  const acceptsWebp = includes('image/webp', req.headers.accept);
  const format = acceptsWebp ? 'webp' : fm;

  let transform = sharp();

  if (format) {
    const opts =
      format === 'jpeg' || format === 'png' ? { progressive: true } : undefined;
    transform = transform.toFormat(format, opts);
  }

  if (w || h) {
    const width = w && parseInt(w, 10);
    const height = h && parseInt(h, 10);
    transform = transform.resize(width, height, { fit, background });
  }

  const image = await fetch(`${NOTION.IMAGE_BASEURL}${url}`);

  const contentType = format
    ? `image/${format}`
    : image.headers.get('content-type');

  res.setHeader('content-type', contentType);
  res.setHeader(
    'cache-control',
    'max-age=604800, s-maxage=3600, stale-while-revalidate'
  );

  return image.body.pipe(transform).pipe(res);
};
