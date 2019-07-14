import React from 'react';

import Embed from './Embed';

describe('Embed', () => {
  function renderEmbed(fn, props = {}) {
    return fn(<Embed {...props} />);
  }

  it('should render with default styles', () => {
    const src = 'https://example.com';
    const title = 'Example website';
    const { container } = renderEmbed(render, { src, title });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should meet basic accessibility guidelines', async () => {
    const src = 'https://example.com';
    const title = 'Example website';
    const html = renderEmbed(renderToHtml, { src, title });
    const result = await axe(html);
    expect(result).toHaveNoViolations();
  });
});
