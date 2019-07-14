import React from 'react';

import Paragraph from './Paragraph';

describe('Paragraph', () => {
  function renderParagraph(fn, props = {}) {
    return fn(<Paragraph {...props} />);
  }

  it('should render with default styles', () => {
    const children = 'Bacon ipsum dolor amet swine shank biltong ham bacon.';
    const { container } = renderParagraph(render, { children });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should meet basic accessibility guidelines', async () => {
    const children = 'Bacon ipsum dolor amet swine shank biltong ham bacon.';
    const html = renderParagraph(renderToHtml, { children });
    const result = await axe(html);
    expect(result).toHaveNoViolations();
  });
});
