import styled from '@emotion/styled';
import { css } from '@emotion/core';

const baseStyles = () => css`
  line-height: 1.75rem;
  margin: 1rem 0;
`;

const Paragraph = styled('p')(baseStyles);

export default Paragraph;
