import React from 'react';

import Image from './Image';

describe('Image', () => {
  function renderImage(fn, props = {}) {
    return fn(<Image {...props} />);
  }

  it('should render with default styles', () => {
    const src = 'https://source.unsplash.com/random';
    const alt = 'A random image from Unsplash';
    const { container } = renderImage(render, { src, alt });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should meet basic accessibility guidelines', async () => {
    const src = 'https://source.unsplash.com/random';
    const alt = 'A random image from Unsplash';
    const html = renderImage(renderToHtml, { src, alt });
    const result = await axe(html);
    expect(result).toHaveNoViolations();
  });
});
