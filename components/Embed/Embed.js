import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const baseStyles = ({ theme, width, height }) => css`
  width: 100%;
  height: 0;
  padding-top: ${((height / width) * 100).toFixed(2)}%;
  background-color: ${theme.colors.offBlack};
  border-radius: ${theme.borderRadius.giga};
  overflow: hidden;
  margin: 2rem 0;
  position: relative;
`;

const fullWidthStyles = ({ fullWidth }) =>
  fullWidth &&
  css`
    grid-column: 1 / 13 !important;
  `;

const Wrapper = styled('div')(baseStyles, fullWidthStyles);

const iframeStyles = () => css`
  max-width: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Iframe = styled('iframe')(iframeStyles);

export default function Embed({ src, title, ...rest }) {
  return (
    <Wrapper {...rest}>
      <Iframe
        src={src}
        title={title}
        allowFullScreen={true}
        frameBorder="0"
        referrerPolicy="no-referrer"
        // eslint-disable-next-line max-len
        sandbox="allow-forms allow-presentation allow-scripts allow-popups allow-popups-to-escape-sandbox"
      />
    </Wrapper>
  );
}
