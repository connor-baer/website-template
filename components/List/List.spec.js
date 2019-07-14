import React from 'react';

import List from './List';

describe('List', () => {
  function renderList(fn, props = {}) {
    return fn(<List {...props} />);
  }

  const defaultProps = {
    children: (
      <>
        <li>One</li>
        <li>Two</li>
      </>
    )
  };

  it('should render with default styles', () => {
    const { container } = renderList(render, { ...defaultProps });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with ordered styles', () => {
    const { container } = renderList(render, {
      ...defaultProps,
      type: List.ORDERED
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should meet basic accessibility guidelines', async () => {
    const html = renderList(renderToHtml, { ...defaultProps });
    const result = await axe(html);
    expect(result).toHaveNoViolations();
  });
});
