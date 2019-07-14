import { css } from '@emotion/core';
import styled from '@emotion/styled';

const baseStyles = ({ theme }) => css`
  text-align: center;
  margin: 0.5rem 0;
  padding: 2rem;
  border: 1px dashed ${theme.colors.p500};
  border-radius: ${theme.borderRadius.giga};
  font-size: 1.5rem;
  font-style: italic;
  line-height: 2.25rem;

  ${theme.mq.kilo} {
    grid-column: 1 / 13;
    padding: 2rem 4rem;
  }

  ${theme.mq.mega} {
    grid-column: 2 / 12;
    padding: 2rem 6rem;
  }
`;

const Callout = styled('div')(baseStyles);

export default Callout;
