import React from 'react';

import CoverImage from './CoverImage';

describe('CoverImage', () => {
  function renderCoverImage(fn, props = {}) {
    return fn(<CoverImage {...props} />);
  }

  const defaultProps = {
    src: 'https://source.unsplash.com/banana.png',
    alt: 'Mango',
    width: 500,
    height: 300
  };

  it('should render with default styles', () => {
    const { container } = renderCoverImage(render, defaultProps);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should meet basic accessibility guidelines', async () => {
    const html = renderCoverImage(renderToHtml, defaultProps);
    const result = await axe(html);
    expect(result).toHaveNoViolations();
  });
});
