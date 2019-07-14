import React from 'react';
import * as Router from 'next/router';

import Link from './Link';

describe('Link', () => {
  function renderLink(fn, props = {}) {
    return fn(<Link {...props} />);
  }

  it('should render with default styles', () => {
    const href = 'https://example.com';
    const children = 'example';
    const { container } = renderLink(render, { href, children });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with preview', () => {
    Router.useRouter = () => ({ query: { preview: true } });
    const href = 'https://example.com';
    const children = 'example';
    const { container } = renderLink(render, { href, children });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should meet basic accessibility guidelines', async () => {
    const href = 'https://example.com';
    const children = 'example';
    const html = renderLink(renderToHtml, { href, children });
    const result = await axe(html);
    expect(result).toHaveNoViolations();
  });
});
