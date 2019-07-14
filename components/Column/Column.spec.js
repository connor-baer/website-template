import React from 'react';

import Column from './Column';

describe('Column', () => {
  function renderColumn(fn, props = {}) {
    return fn(<Column {...props} />);
  }

  it('should render with default styles', () => {
    const children = 'label';
    const { container } = renderColumn(render, { children, index: 1 });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should meet basic accessibility guidelines', async () => {
    const children = 'label';
    const html = renderColumn(renderToHtml, { children, index: 1 });
    const result = await axe(html);
    expect(result).toHaveNoViolations();
  });
});
