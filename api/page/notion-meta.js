const { get, first, values, entries, toLower } = require('lodash/fp');

const { getImageUrl } = require('./util');

function getProp(path) {
  return prop => get(path, prop);
}

const propertyMap = {
  date: getProp('[0][1][0][1].start_date'),
  person: getProp('[0][1][0][1]'),
  title: getProp('[0][0]')
};

function getProperties(page, schema) {
  const properties = entries(get('value.properties', page)) || [];

  return properties.reduce((allProperties, property) => {
    const [key, prop] = property;
    const name = toLower(get(`${key}.name`, schema));
    const type = get(`${key}.type`, schema);
    const valueGetter = propertyMap[type];

    if (valueGetter) {
      // eslint-disable-next-line no-param-reassign
      allProperties[name] = { value: valueGetter(prop), type };
    }

    return allProperties;
  }, {});
}

function getNotionMeta(data) {
  const collection = first(values(get('recordMap.collection', data)));
  const schema = get('value.schema', collection);
  const page = first(values(get('recordMap.block', data)));
  const properties = getProperties(page, schema);

  const emoji = get('value.format.page_icon', page);
  const url = get('value.format.page_cover', page);
  const image = { src: getImageUrl(url) };

  const { name, ...rest } = properties;

  return {
    ...rest,
    title: name.value,
    type: 'article',
    emoji,
    image
  };
}

module.exports = {
  getNotionMeta
};
