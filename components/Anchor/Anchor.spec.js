import React from 'react';

import Anchor from './Anchor';

describe('Anchor', () => {
  function renderAnchor(fn, props = {}) {
    return fn(<Anchor {...props} />);
  }

  it('should render with default styles', () => {
    const href = 'https://connorbaer.co';
    const children = 'label';
    const { container } = renderAnchor(render, { href, children });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should meet basic accessibility guidelines', async () => {
    const href = 'https://connorbaer.co';
    const children = 'label';
    const html = renderAnchor(renderToHtml, { href, children });
    const result = await axe(html);
    expect(result).toHaveNoViolations();
  });
});
