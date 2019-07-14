import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Link from '../Link';

const baseStyles = ({ theme }) => css`
  color: ${theme.colors.p500};
  transition: color 0.1s ease-in-out, border 0.1s ease-in-out,
    background-color 0.1s ease-in-out, outline 0.1s ease-in-out;

  &:hover {
    color: ${theme.colors.p900};
  }

  &:focus {
    outline: thin dotted currentColor;
    outline-offset: 0.25em;
  }

  &:active {
    color: ${theme.colors.p500};
  }
`;

const A = styled('a')(baseStyles);

export default function Anchor({ children, className, ...rest }) {
  return (
    <Link {...rest} passHref>
      <A className={className}>{children}</A>
    </Link>
  );
}
