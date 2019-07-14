import { css } from '@emotion/core';
import styled from '@emotion/styled';

const baseStyles = ({ theme }) => css`
  margin: 1rem 0;
  padding-left: 2rem;
  font-size: 1.5rem;
  font-style: italic;
  line-height: 2.25rem;
  position: relative;

  &::before {
    display: block;
    border-top-right-radius: ${theme.borderRadius.mega};
    border-bottom-right-radius: ${theme.borderRadius.mega};
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${theme.borderRadius.mega};
    background-color: ${theme.colors.p500};
  }
`;

const Quote = styled('blockquote')(baseStyles);

export default Quote;
