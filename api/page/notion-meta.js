const { get, first, values } = require('lodash/fp');

const { getImageUrl } = require('./util');

function getNotionMeta(data) {
  const page = first(values(get('recordMap.block', data)));
  const title = get('value.properties.title[0][0]', page);
  const emoji = get('value.format.page_icon', page);
  const url = get('value.format.page_cover', page);
  const image = getImageUrl(url);

  return {
    title,
    emoji,
    image
  };
}

module.exports = {
  getNotionMeta
};
