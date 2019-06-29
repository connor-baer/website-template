import React from 'react';

import Callout from './Callout';

describe('Callout', () => {
  function renderCallout(fn, props = {}) {
    return fn(<Callout {...props} />);
  }

  it('should render with default styles', () => {
    const children = 'Bacon ipsum dolor amet swine shank biltong ham bacon.';
    const { container } = renderCallout(render, { children });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should meet basic accessibility guidelines', async () => {
    const children = 'Bacon ipsum dolor amet swine shank biltong ham bacon.';
    const html = renderCallout(renderToHtml, { children });
    const result = await axe(html);
    expect(result).toHaveNoViolations();
  });
});
