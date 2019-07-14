import styled from '@emotion/styled';
import { css } from '@emotion/core';

import * as ColumnListService from './ColumnListService';

const baseStyles = ({ theme, columns = [] }) => {
  const narrowTemplateAreas = ColumnListService.getNarrowTemplateAreas(columns);
  const wideTemplateAreas = ColumnListService.getWideTemplateAreas(columns);

  return css`
    grid-column: 1 / 13 !important;
    display: grid;
    grid-template-columns: repeat(12, [col-start] minmax(0, 1fr));
    grid-template-areas: ${narrowTemplateAreas};
    margin: 2rem 0;

    ${theme.mq.kilo} {
      grid-column-gap: 3rem;
      grid-template-areas: ${wideTemplateAreas};
    }
  `;
};

const ColumnList = styled('div')(baseStyles);

export default ColumnList;
