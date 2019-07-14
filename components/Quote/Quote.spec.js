import React from 'react';

import Quote from './Quote';

describe('Quote', () => {
  function renderQuote(fn, props = {}) {
    return fn(<Quote {...props} />);
  }

  it('should render with default styles', () => {
    const children = 'Bacon ipsum dolor amet swine shank biltong ham bacon.';
    const { container } = renderQuote(render, { children });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should meet basic accessibility guidelines', async () => {
    const children = 'Bacon ipsum dolor amet swine shank biltong ham bacon.';
    const html = renderQuote(renderToHtml, { children });
    const result = await axe(html);
    expect(result).toHaveNoViolations();
  });
});
