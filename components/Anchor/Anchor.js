import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const baseStyles = ({ theme }) => css`
  color: ${theme.colors.p500};
  transition: color 0.1s ease-in-out, border 0.1s ease-in-out;

  &:visited {
    color: ${theme.colors.v900};
  }

  &:hover {
    color: ${theme.colors.p900};
  }

  &:focus {
    outline: thin solid currentColor;
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
