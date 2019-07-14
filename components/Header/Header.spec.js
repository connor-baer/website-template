import React from 'react';

import Header from './Header';

describe('Header', () => {
  function renderHeader(fn, props = {}) {
    return fn(<Header {...props} />);
  }

  const defaultProps = {
    title: 'Pineapple',
    image: {
      src: 'https://source.unsplash.com/pineapple.png'
    }
  };

  it('should render with default styles', () => {
    const { container } = renderHeader(render, defaultProps);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should meet basic accessibility guidelines', async () => {
    const html = renderHeader(renderToHtml, defaultProps);
    const result = await axe(html);
    expect(result).toHaveNoViolations();
  });
});
