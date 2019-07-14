const url = require('url');
const { startsWith } = require('lodash/fp');
const { parseISO, format, isAfter, isBefore } = require('date-fns');
const {
  get,
  first,
  values,
  entries,
  toLower,
  replace,
  flow,
  reduce
} = require('lodash/fp');
const { richTextFromNotion } = require('@madebyconnor/rich-text-from-notion');

const { API_BASEURL } = require('../../../constants/api');

const ISO_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx";

function getImageUrl(src) {
  const pathname = `${API_BASEURL}/image`;
  const isHostedByNotion = startsWith('/images/', src);
  const fullSrc = isHostedByNotion ? `https://notion.so${src}` : src;
  const query = { url: encodeURIComponent(fullSrc) };
  return url.format({ pathname, query });
}

function parseDate(date, time) {
  if (!date) {
    return null;
  }
  const fullDate = time ? `${date}T${time}` : date;
  return parseISO(fullDate);
}

function getDate(prop) {
  if (!prop) {
    return null;
  }

  const date = {};

  const dates = get('[0][1][0][1]', prop);
  const startDate = parseDate(dates.start_date, dates.start_time);
  const endDate = parseDate(dates.end_date, dates.end_time);

  if (startDate) {
    date.start = {
      iso: format(startDate, ISO_FORMAT),
      date: format(startDate, 'dd. MMMM yyyy'),
      time: format(startDate, 'HH:mm')
    };
  }

  if (endDate) {
    date.end = {
      iso: format(endDate, ISO_FORMAT),
      date: format(endDate, 'dd. MMMM yyyy'),
      time: format(endDate, 'HH:mm')
    };
  }

  return date;
}

function getMultiSelect(prop) {
  const value = get('[0][0]', prop) || '';
  return value.split(',');
}

const propertyMap = {
  date: getDate,
  person: get('[0][1][0][1]'),
  title: get('[0][0]'),
  multi_select: getMultiSelect
};

function getPage(data) {
  return first(values(get('recordMap.block', data)));
}

function getCollection(data) {
  return first(values(get('recordMap.collection', data)));
}

function getSchema(collection) {
  return get('value.schema', collection);
}

function getId(data) {
  return flow(
    get('value.id'),
    replace(/-/g, '')
  )(data);
}

function mapProperties(schema) {
  const schemaEntries = entries(schema);
  return properties =>
    reduce(
      (allProperties, scheme) => {
        const [key, schemeProps = {}] = scheme;
        const name = flow(
          get('name'),
          toLower
        )(schemeProps);
        const type = get('type', schemeProps);

        const property = properties[key];
        const valueGetter = propertyMap[type];

        if (valueGetter) {
          const value = valueGetter(property);
          // eslint-disable-next-line no-param-reassign
          allProperties[name] = { value, type };
        }

        return allProperties;
      },
      {},
      schemaEntries
    );
}

function isPagePublished(properties = {}) {
  if (!properties.published) {
    return true;
  }

  const now = new Date();

  const start = get('published.value.start.iso', properties);
  const end = get('published.value.end.iso', properties);

  const isDraft = start ? isBefore(now, parseISO(start)) : true;
  const isExpired = end ? isAfter(now, parseISO(end)) : false;

  return !isDraft && !isExpired;
}

function getPageProperties(page, schema) {
  const properties = flow(
    get('value.properties'),
    mapProperties(schema)
  )(page);

  const id = getId(page);
  const icon = get('value.format.page_icon', page);
  const coverUrl = get('value.format.page_cover', page);
  const image = coverUrl && { src: getImageUrl(coverUrl) };
  const isLive = isPagePublished(properties);
  const title = get('value.properties.title[0][0]', page);

  return {
    ...properties,
    id,
    title,
    type: 'article',
    icon,
    image,
    isLive
  };
}

function getPageMeta(data) {
  const page = getPage(data);
  const collection = getCollection(data);
  const schema = getSchema(collection);

  return getPageProperties(page, schema);
}

function getPageContent(page) {
  return richTextFromNotion(page, { preserveLayout: true });
}

function getCollectionProperties(collection) {
  const id = getId(collection);
  const title = get('value.name[0][0]', collection);
  const icon = get('value.icon', collection);
  const coverUrl = get('value.cover', collection);
  const image = coverUrl && { src: getImageUrl(coverUrl) };

  return {
    id,
    title,
    icon,
    image
  };
}
function getCollectionMeta(data) {
  const collection = getCollection(data);
  return getCollectionProperties(collection);
}

function getCollectionPages(data, isPreview) {
  const collection = getCollection(data);
  const schema = getSchema(collection);

  const pages = values(get('recordMap.block', data));

  return pages
    .filter((page = {}) => get('value.type', page) === 'page')
    .map((page = {}) => getPageProperties(page, schema))
    .filter((page = {}) => isPreview || page.isLive);
}

module.exports = {
  getPageMeta,
  getPageContent,
  getCollectionMeta,
  getCollectionPages
};
