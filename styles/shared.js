import { css } from '@emotion/core';

const maxWidth = '80rem'; // 1280px
const pageWidth = '67.5rem'; // 1080px

export const fullWidthStyles = ({ theme }) => css`
  max-width: ${maxWidth};
  margin-right: auto;
  margin-left: auto;

  ${theme.mq.kilo} {
    padding-right: 2rem;
    padding-left: 2rem;
  }
`;

export const pageWidthStyles = ({ theme }) => css`
  max-width: ${pageWidth};
  margin-right: auto;
  margin-left: auto;
  padding-right: 1rem;
  padding-left: 1rem;

  ${theme.mq.kilo} {
    padding-right: 2rem;
    padding-left: 2rem;
  }
`;

export const gridStyles = () => css`
  display: grid;
  grid-template-columns: repeat(12, [col-start] minmax(0, 1fr));
  grid-column-gap: 1rem;
`;
