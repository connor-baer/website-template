import React from 'react';

import Layout from './Layout';

describe('Layout', () => {
  function renderLayout(fn, props = {}) {
    return fn(<Layout {...props} />);
  }

  it('should render with default styles', () => {
    const children = 'label';
    const { container } = renderLayout(render, { children });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should meet basic accessibility guidelines', async () => {
    const children = 'label';
    const html = renderLayout(renderToHtml, { children });
    const result = await axe(html);
    expect(result).toHaveNoViolations();
  });
});
