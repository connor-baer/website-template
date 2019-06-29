import { css } from '@emotion/core';
import styled from '@emotion/styled';

const baseStyles = ({ theme }) => css`
  background-color: ${theme.colors.n100};
  padding: ${theme.spacings.kilo};

  @media print {
    border: 1pt solid ${theme.colors.n700};
  }
`;

const Callout = styled('div')(baseStyles);

export default Callout;
