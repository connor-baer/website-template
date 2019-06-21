const { BLOCKS, MARKS } = require('@contentful/rich-text-types');
const { get, isEmpty, values } = require('lodash/fp');

const { SECTION_TYPES } = require('../../constants/notion');
const { getImageUrl } = require('./util');

const markMap = {
  b: MARKS.BOLD,
  i: MARKS.ITALIC,
  u: MARKS.UNDERLINE,
  c: MARKS.CODE,
  h: 'highlight'
};

function toMark(mark = []) {
  const [typeId, data] = mark;
  return {
    type: markMap[typeId],
    data
  };
}

function toText(text = []) {
  const [value, marks = []] = text;
  return {
    nodeType: 'text',
    value,
    marks: marks.map(toMark)
  };
}

function toHeading(level) {
  return block => {
    const content = get('value.properties.title', block) || [];

    if (isEmpty(content)) {
      return null;
    }

    return {
      nodeType: `heading-${level}`,
      content: content.map(toText)
    };
  };
}

function toParagraph(block) {
  const content = get('value.properties.title', block) || [];
  return {
    nodeType: BLOCKS.PARAGRAPH,
    content: content.map(toText)
  };
}

function toQuote(block) {
  const content = get('value.properties.title', block) || [];
  return {
    nodeType: BLOCKS.QUOTE,
    content: content.map(toText)
  };
}

function toListItem(listType) {
  return block => ({
    listType,
    nodeType: BLOCKS.LIST_ITEM,
    content: [toParagraph(block)]
  });
}

function toImage(block) {
  const url = get('value.format.display_source', block);
  const src = getImageUrl(url);
  const caption = get('value.properties.caption[0]', block) || [];
  return {
    nodeType: BLOCKS.EMBEDDED_ENTRY,
    data: {
      type: 'image',
      src,
      alt: caption[0]
    },
    content: [toText(caption)]
  };
}

function toHorizontalRule() {
  return {
    content: [],
    nodeType: BLOCKS.HR
  };
}

const transformerMap = {
  [SECTION_TYPES.HEADER]: toHeading(2),
  [SECTION_TYPES.SUB_HEADER]: toHeading(3),
  [SECTION_TYPES.SUB_SUB_HEADER]: toHeading(4),
  [SECTION_TYPES.TEXT]: toParagraph,
  [SECTION_TYPES.QUOTE]: toQuote,
  [SECTION_TYPES.BULLETED_LIST]: toListItem(BLOCKS.UL_LIST),
  [SECTION_TYPES.NUMBERED_LIST]: toListItem(BLOCKS.OL_LIST),
  [SECTION_TYPES.IMAGE]: toImage,
  [SECTION_TYPES.DIVIDER]: toHorizontalRule
};

function cleanSections(sections) {
  const nodes = [];

  let tmpListType = null;
  let tmpListContent = null;

  /* eslint-disable no-restricted-syntax, no-continue */
  for (const section of sections) {
    if (!section) {
      continue;
    }

    const { listType, ...node } = section;

    const isEndOfList = tmpListContent && tmpListType !== listType;

    if (isEndOfList) {
      nodes.push({
        nodeType: tmpListType,
        content: tmpListContent
      });
      tmpListType = null;
      tmpListContent = null;
    }

    const isList = !!listType;

    if (isList) {
      const isStartOfList = !tmpListType && !tmpListContent;

      if (isStartOfList) {
        tmpListType = listType;
        tmpListContent = [node];
      } else {
        tmpListContent.push(node);
      }

      continue;
    }

    nodes.push(node);
  }

  return nodes;
}
/* eslint-enable no-restricted-syntax, no-continue */

function notionToRichText(blocks = {}) {
  const sections = values(blocks).map(block => {
    const type = get('value.type', block);
    const transformerFn = transformerMap[type];

    if (!transformerFn) {
      return null;
    }

    return transformerFn(block);
  });

  const content = cleanSections(sections);

  return {
    nodeType: 'document',
    data: {},
    content
  };
}

module.exports = { notionToRichText };
