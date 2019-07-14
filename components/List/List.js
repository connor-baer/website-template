import { css } from '@emotion/core';
import styled from '@emotion/styled';

const UNORDERED = 'unordered';
const ORDERED = 'ordered';

const baseStyles = ({ theme }) => css`
  margin: 0;
  padding-left: 0;
  list-style-type: none;

  li {
    position: relative;
    padding-left: 2rem;

    &::before {
      position: absolute;
      left: 0;
      top: 0.25em;
      text-align: right;
      color: ${theme.colors.p500};
      display: inline-block;
      min-width: 1.25em;
      margin-left: 0rem;
      margin-right: 0.5rem;
    }
  }

  p {
    margin: 0;
  }
`;

const unorderedStyles = ({ type = UNORDERED }) =>
  type === UNORDERED &&
  css`
    li::before {
      content: '•';
      transform: scale(1.25);
      transform-origin: right;
    }
  `;

const orderedStyles = ({ type = UNORDERED }) =>
  type === ORDERED &&
  css`
    counter-reset: li;

    li {
      counter-increment: li;

      &::before {
        content: counter(li, decimal-leading-zero);
        font-variant-numeric: tabular-nums;
      }
    }
  `;

const List = styled('ul')(baseStyles, unorderedStyles, orderedStyles);

List.UNORDERED = UNORDERED;
List.ORDERED = ORDERED;

export default List;
