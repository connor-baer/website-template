import React from 'react';

import Highlight from './Highlight';

describe('Highlight', () => {
  function renderHighlight(fn, props = {}) {
    return fn(<Highlight {...props} />);
  }

  it('should render with default styles', () => {
    const children = 'Bacon ipsum dolor amet swine shank biltong ham bacon.';
    const { container } = renderHighlight(render, { children });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should meet basic accessibility guidelines', async () => {
    const children = 'Bacon ipsum dolor amet swine shank biltong ham bacon.';
    const html = renderHighlight(renderToHtml, { children });
    const result = await axe(html);
    expect(result).toHaveNoViolations();
  });
});
