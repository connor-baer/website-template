import React from 'react';

import Divider from './Divider';

describe('Divider', () => {
  function renderDivider(fn, props = {}) {
    return fn(<Divider {...props} />);
  }

  it('should render with default styles', () => {
    const { container } = renderDivider(render);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should meet basic accessibility guidelines', async () => {
    const html = renderDivider(renderToHtml);
    const result = await axe(html);
    expect(result).toHaveNoViolations();
  });
});
