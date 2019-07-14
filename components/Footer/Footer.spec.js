import React from 'react';

import Footer from './Footer';

describe('Footer', () => {
  function renderFooter(fn, props = {}) {
    return fn(<Footer {...props} />);
  }

  it('should render with default styles', () => {
    const { container } = renderFooter(render);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should meet basic accessibility guidelines', async () => {
    const html = renderFooter(renderToHtml);
    const result = await axe(html);
    expect(result).toHaveNoViolations();
  });
});
