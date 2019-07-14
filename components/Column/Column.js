import styled from '@emotion/styled';
import { css } from '@emotion/core';

const baseStyles = ({ theme, index }) => css`
  grid-area: ${`column-${index}`};
  align-self: center;
  display: flex;
  flex-direction: column;

  ${theme.mq.kilo} {
    > *:first-child {
      padding-top: 0;
      margin-top: 0;
    }

    > *:last-child {
      padding-bottom: 0;
      margin-bottom: 0;
    }
  }
`;

const Column = styled('div')(baseStyles);

export default Column;
