const url = require('url');
const { startsWith } = require('lodash/fp');

const { API_BASEURL } = require('../../constants/api');

const pathname = `${API_BASEURL}/image`;

function getImageUrl(src) {
  const isHostedByNotion = startsWith('/images/', src);
  const fullSrc = isHostedByNotion ? `https://notion.so${src}` : src;
  const query = { url: encodeURIComponent(fullSrc) };
  return url.format({ pathname, query });
}

module.exports = {
  getImageUrl
};
