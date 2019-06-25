import styled from '@emotion/styled';
import { hideVisually } from 'polished';

/**
 * NOTE: Accessibility improvements are taken from
 * http://adrianroselli.com/2017/12/tweaking-text-level-styles.html
 */

const Highlight = styled('mark')`
  display: inline;
  background-color: #fbf3db;

  &::before,
  &::after {
    ${hideVisually()};
  }

  &::before {
    content: ' [highlight start] ';
  }

  &::after {
    content: ' [highlight end] ';
  }

  @media screen and (-ms-high-contrast: active) {
    color: HighlightText;
    background-color: Highlight;
  }

  @media print {
    border: 1pt dotted #000;
  }
`;

export default Highlight;
