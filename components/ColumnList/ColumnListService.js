import { get } from 'lodash/fp';

const GRID_COLUMNS = 12;

export function getNarrowTemplateAreas(columns) {
  return columns
    .map((_, index) => {
      const areaName = `column-${index} `;
      return `"${areaName.repeat(GRID_COLUMNS)}"`;
    })
    .join(' ');
}

export function getWideTemplateAreas(columns) {
  let remainingColumns = GRID_COLUMNS;

  const templateAreas = columns.reduce((areas, column, index) => {
    const areaName = `column-${index} `;
    const ratio = get('data.ratio', column);
    const isLast = index === columns.length - 1;
    const columnWidth = isLast
      ? remainingColumns
      : Math.round(GRID_COLUMNS * ratio);

    remainingColumns -= columnWidth;

    return `${areas}${areaName.repeat(columnWidth)}`;
  }, '');

  return `"${templateAreas}"`;
}
