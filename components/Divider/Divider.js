import { css } from '@emotion/core';
import styled from '@emotion/styled';

const baseStyles = ({ theme }) => css`
  border: 3px solid ${theme.colors.p500};
  margin: 2rem 0;
  grid-column: 1 / 13 !important;
  opacity: 0.2;
`;

const Divider = styled('hr')(baseStyles);

export default Divider;
