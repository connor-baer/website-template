import React from 'react';

import Navigation from './Navigation';

describe('Navigation', () => {
  function renderNavigation(fn, props = {}) {
    return fn(<Navigation {...props} />);
  }

  it('should render with default styles', () => {
    const { container } = renderNavigation(render);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should meet basic accessibility guidelines', async () => {
    const html = renderNavigation(renderToHtml);
    const result = await axe(html);
    expect(result).toHaveNoViolations();
  });
});
