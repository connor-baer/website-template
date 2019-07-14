import React from 'react';

import Grid from './Grid';

describe('Grid', () => {
  function renderGrid(fn, props = {}) {
    return fn(<Grid {...props} />);
  }

  it('should render with default styles', () => {
    const { container } = renderGrid(render);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should meet basic accessibility guidelines', async () => {
    const html = renderGrid(renderToHtml);
    const result = await axe(html);
    expect(result).toHaveNoViolations();
  });
});
