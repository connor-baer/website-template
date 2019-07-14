import React from 'react';

import Heading from './Heading';

describe('Heading', () => {
  function renderHeading(fn, props = {}) {
    return fn(<Heading {...props} />);
  }

  it('should render with default styles', () => {
    const children = 'Lychee';
    const { container } = renderHeading(render, { children });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with h1 styles', () => {
    const children = 'Lychee';
    const { container } = renderHeading(render, { children, as: 'h1' });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with h3 styles', () => {
    const children = 'Lychee';
    const { container } = renderHeading(render, { children, as: 'h3' });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with h4 styles', () => {
    const children = 'Lychee';
    const { container } = renderHeading(render, { children, as: 'h4' });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should meet basic accessibility guidelines', async () => {
    const children = 'Lychee';
    const html = renderHeading(renderToHtml, { children });
    const result = await axe(html);
    expect(result).toHaveNoViolations();
  });
});
