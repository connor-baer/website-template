import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import * as ImageService from './ImageService';

const wrapperBaseStyles = () => css`
  display: block;
  position: relative;
  overflow: hidden;
  height: auto;
  width: 100%;
`;

const wrapperAspectRatioStyles = ({ aspectRatio }) =>
  aspectRatio &&
  css`
    height: 0;
    padding-top: ${(1 / aspectRatio) * 100}%;
  `;

const Wrapper = styled('div')(wrapperBaseStyles, wrapperAspectRatioStyles);

const imageBaseStyles = () => css`
  display: block;
  line-height: 0;
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  color: inherit;
  text-align: center;
`;

const imageAspectRatioStyles = ({ aspectRatio }) =>
  aspectRatio &&
  css`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    object-fit: cover;
  `;

const Img = styled('img')(imageBaseStyles, imageAspectRatioStyles);

export default function Image({ as, src, alt, loading, className, ...props }) {
  const aspectRatio =
    props.width && props.height ? props.width / props.height : false;
  return (
    <Wrapper aspectRatio={aspectRatio} as={as} className={className}>
      <Img
        alt={alt}
        loading={loading}
        src={ImageService.getSrc(src, props)}
        aspectRatio={aspectRatio}
        className={className}
      />
    </Wrapper>
  );
}
