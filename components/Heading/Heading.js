import styled from '@emotion/styled';
import { css } from '@emotion/core';

const sizeMap = {
  h1: {
    fontSize: ['2.25rem', '2.75rem']
  },
  h2: {
    fontSize: ['1.75rem', '2rem']
  },
  h3: {
    fontSize: ['1.33rem', '1.5rem']
  },
  h4: {
    fontSize: ['1.25rem', '1.25rem']
  }
};

const baseStyles = ({ theme, size, as = 'h2' }) => {
  const { fontSize } = sizeMap[size || as];

  return css`
    font-size: ${fontSize[0]};
    line-height: 1.5;
    letter-spacing: 0.15px;
    text-decoration: none;
    margin: 1em 0 0;

    ${theme.mq.kilo} {
      font-size: ${fontSize[1]};
    }

    a {
      text-decoration: none;

      &:hover,
      &:focus {
        text-decoration: underline;
      }
    }
  `;
};

const Heading = styled('h2')(baseStyles);

export default Heading;
