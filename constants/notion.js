const API_BASEURL = 'https://www.notion.so/api/v3/';
const IMAGE_BASEURL = 'https://www.notion.so/image/';

const SECTION_TYPES = {
  PAGE: 'page',
  HEADER: 'header',
  SUB_HEADER: 'sub_header',
  SUB_SUB_HEADER: 'sub_sub_header',
  TEXT: 'text',
  QUOTE: 'quote',
  BULLETED_LIST: 'bulleted_list',
  NUMBERED_LIST: 'numbered_list',
  IMAGE: 'image',
  DIVIDER: 'divider',
  COLLECTION_VIEW: 'collection_view'
};

module.exports = { IMAGE_BASEURL, API_BASEURL, SECTION_TYPES };
