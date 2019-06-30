import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { hideVisually } from 'polished';

/**
 * NOTE: Accessibility improvements are taken from
 * http://adrianroselli.com/2017/12/tweaking-text-level-styles.html
 */

const baseStyles = ({ theme }) => css`
  display: inline;
  color: #000;
  background-color: ${theme.colors.y100};

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
    border: 1pt dotted ${theme.colors.black};
  }
`;

const Highlight = styled('mark')(baseStyles);

export default Highlight;
