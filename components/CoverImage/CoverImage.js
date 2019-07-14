import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Image from '../Image';

const wrapperStyles = ({ theme }) => css`
  background: ${theme.colors.n300};
  color: ${theme.colors.n300};
  border-radius: ${theme.borderRadius.giga};
  -webkit-mask-image: -webkit-radial-gradient(white, black);

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity ${theme.animations.standard};
    background: radial-gradient(transparent, ${theme.colors.shadow});
    content: '';
    opacity: 0;
  }

  a:hover &,
  a:focus & {
    &::after {
      opacity: 0.2;
    }
  }
`;

const imageStyles = ({ theme }) =>
  !theme.reducedMotion &&
  css`
    img {
      transition: transform ${theme.animations.motion};
      will-change: transform;
      backface-visibility: hidden;

      a:hover &,
      a:focus & {
        transform: scale(1.04);
      }
    }
  `;

const CoverImage = styled(Image)(wrapperStyles, imageStyles);

/**
 * @component
 */
export default CoverImage;
